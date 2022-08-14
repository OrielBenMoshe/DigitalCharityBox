const axios = require("axios").default;
require("dotenv").config();
const baseURL = "https://www.myofficeguy.com/api";

module.exports = {
  getGateway: async (req, res) => {
    const url = `${baseURL}/creditguy/gateway/beginredirect/`;
    const bodyRequest = {
      Credentials: {
        CompanyID: process.env.COMPANY_ID,
        APIKey: process.env.API_KEY,
      },
      Mode: "ValidateCard",
      RedirectURL: "http://localhost:3000/Signup",
    };
    await axios
      .post(url, bodyRequest)
      .then((response) => {
        res.status(200).json(response.data.Data);
      })
      .catch((error) => {
        console.log("error:", error);
        res.status(500).json({
          error,
        });
      });
  },
  getOfficeGuy: async (req, res) => {
    const url = "https://app.sumit.co.il/scripts/payments.js";
    await axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log("error:", error);
      res.status(500).json({
        error,
      });
    });
  },
  setCustomer: async (req, res) => {
    // console.log("req:", req.body);
    const customer = req.body;
    const url = `${baseURL}/billing/paymentmethods/setforcustomer`;
    const bodyRequest = {
      Credentials: {
        CompanyID: process.env.COMPANY_ID,
        APIKey: process.env.API_KEY,
      },
      Customer: {
        Name: customer.displayName,
        Phone: customer.phoneNumber,
        EmailAddress: customer.email,
        SearchMode: "Automatic",
      },
      SingleUseToken: customer.token,
    };
    await axios
      .post(url, bodyRequest)
      .then(({data}) => {
        // console.log(data.Data);
        if (data.Data.CustomerID) {
          const customer = {
            customerId: data.Data.CustomerID,
            lastDigits: data.Data.PaymentMethod.CreditCard_LastDigits,
            expirationMonth: data.Data.PaymentMethod.CreditCard_ExpirationMonth,
            expirationYear: data.Data.PaymentMethod.CreditCard_ExpirationYear,
          }
          res.status(200).json(customer);
        } else res.status(200).json(data.Data);
      })
      .catch((error) => {
        console.log("error:", error);
        res.status(500).json({
          error,
        });
      });
  },
};
