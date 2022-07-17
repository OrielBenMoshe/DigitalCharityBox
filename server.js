const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const { connectToDb, models } = require("./models");
const users = require("./funcOftheServer/users");

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");

dotenv.config();
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "client/build")));

const PORT = process.env.PORT || 7000;

connectToDb().then(async () => {
  app.listen(PORT, () => {
    console.log("Server is running port ", PORT);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/Signup", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/Home", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post("/api/addUser/", users.addUser);
app.get("/api/listUsers/", users.listUsers);
app.post("/api/userConnected/:id", users.userConnected);
app.put("/api/editUser/:id", users.editUser);
