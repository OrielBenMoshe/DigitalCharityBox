const cron = require("node-cron");
const { listUsers } = require("./controllers/users");
const { setCreditCardsCharge } = require("./controllers/sumit");
const express = require("express");
const app = express();

// const cronJob = async () => {
//   const customersUrl = "/api/listUsers/";
//   try {
//     const customers = await axios.get(customersUrl);
//     console.log("::::::::::");
//   } catch (error) {}
// };


/** Creating a monthly charge for all DB users. */
// const task = cron.schedule("*/3 * * * *", async () => {
//   const result = await listUsers();
//   console.log("Users List");
//   console.log(result);
//   if (result.isSucceed) {
//     try {
//         const response = await setCreditCardsCharge({body: result.users})
//         console.log(response);
//     } catch (error) {
//         console.log("error:", error);
//     }
//   }
//   this.stop();
// });

// task.start();