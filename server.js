
const cors = require("cors");
const express = require("express");
const router = require("express").Router();
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
require('./cron.js');

const path = require("path");
const { connectToDb, models } = require("./models");
const {
  addUser,
  listUsers,
  findUser,
  updateUser,
} = require("./controllers/users");
const {
  getGateway,
  setCustomer,
  getOfficeGuy,
  setCreditCardsCharge,
} = require("./controllers/sumit");

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
const { log } = require("console");

dotenv.config();
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "client/build")));

const PORT = process.env.PORT || 7000;

/** Connect to Mongo */
connectToDb().then(async () => {
  app.listen(PORT, () => {
    console.log("Server is running port", PORT);
  });
});

/** Heroku Routes */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/Signup", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/Home", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

/** End Points for MongoDB */
app.post("/api/addUser/", addUser);
app.get("/api/listUsers/", listUsers);
app.get("/api/findUser/:id", findUser);
app.put("/api/updateUser/:id", updateUser);

/** End Point to Sumit */
app.get("/api/sumit/getGateway", getGateway);
app.get("/api/sumit/getOfficeGuy", getOfficeGuy);
app.post("/api/sumit/setCustomer", setCustomer);
app.post("/api/sumit/setCreditCardsCharge", setCreditCardsCharge);


