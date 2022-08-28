const cron = require("node-cron");
const { listUsers, clearTotalAmount } = require("./controllers/users");
const { setCreditCardsCharge } = require("./controllers/sumit");
const express = require("express");
const app = express();

/** 
 * The function is performed after the credit cards have been charged, 
 * in order to clear the Total-Amounts accumulated by the users 
 * and refresh the client side to avoid returning the amount accumulated 
 * from the previous month, 
 * because the data was not updated on the client side. 
 * */
 const clearTotalAmountFromUsers = (chargeList) => {
    chargeList.forEach(async (charge) => {
      if (charge.Payment && charge.Payment.ValidPayment) {
        const res = await clearTotalAmount(charge.CustomerID);
        console.log("clearing totalAmount:",res);
        /* יש ליצור מאזין בצד לקוח שירנדר את האפליקציה, 
        כך שבכל פעם שנוצר שינוי במסד נתונים במשתמש הספציפי שלו */
      }
    });
  
  };

/** Creating a monthly charge for all DB users. */
const task = cron.schedule("0 9 * * 1,4", async () => { //“At 09:00 on Monday and Thursday.”
  const result = await listUsers();
  console.log("Users List");
  console.log(result);
  if (result.isSucceed) {
    try {
      const chargesResponses = await Promise.all(
        setCreditCardsCharge({ body: result.users })
      );
      const chargeList = chargesResponses.map((chargeRes) => {
        const data = chargeRes.data.Data;
        console.log("chargeRes.data:", chargeRes.data);
        if (data) {
          return {
            CustomerID: data.CustomerID,
            Payment: {
              ID: data.Payment.ID,
              Date: data.Payment.Date,
              Amount: data.Payment.Amount,
              ValidPayment: data.Payment.ValidPayment,
              StatusDescription: data.Payment.StatusDescription,
            },
            DocumentID: data.DocumentID,
            DocumentNumber: data.DocumentNumber,
            DocumentDownloadURL: data.DocumentDownloadURL,
          };
        } else {
          console.log(
            `UserErrorMessage for Customer ID '${chargeRes.data.CustomerID}': `,
            chargeRes.data.UserErrorMessage
          );
          return {
            CustomerID: chargeRes.data.CustomerID,
            UserErrorMessage: chargeRes.data.UserErrorMessage,
          };
        }
      });
      console.log("chargeList:", chargeList);
      clearTotalAmountFromUsers(chargeList);
    } catch (error) {
      console.log("error:", error);
    }
  }
});
task.start();


