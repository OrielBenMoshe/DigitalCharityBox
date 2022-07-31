const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  firebaseUID: String,
  personalInfo: {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    password: String,
    email: String,
    city: String,
    address: String,
  },

  date: { type: String, default: Date },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
