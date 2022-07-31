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
        console.log(response.data.Data);
        res.status(200).json(response.data.Data);
      })
      .catch((error) => {
        console.log("error:", error);
        res.status(500).json({
          error,
        });
      });
  },
  setCustomer: async (req, res) => {
    const url = `${baseURL}/billing/paymentmethods/setforcustomer`;
    const bodyRequest = {
      Credentials: {
        CompanyID: process.env.COMPANY_ID,
        APIKey: process.env.API_KEY,
      },
      Customer: {
        Name: "string",
        Phone: "string",
        EmailAddress: "string",
        SearchMode: "Automatic",
      },
      PaymentMethod: {
        CreditCard_ExpirationMonth: 12,
        CreditCard_ExpirationYear: 0,
        CreditCard_CitizenID: "string",
        CreditCard_Token: "string",
        Type: "CreditCard",
      },
    };
    await axios
      .post(url, bodyRequest)
      .then((response) => {
        console.log(response.data.Data);
        res.status(200).json(response.data.Data);
      })
      .catch((error) => {
        console.log("error:", error);
        res.status(500).json({
          error,
        });
      });
  },
};
