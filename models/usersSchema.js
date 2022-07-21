const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  UIDfirebase: String,
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

const product1 = new Users({
  personalInfo: {
    firstName: "String",
  },
});

// product1.save();
// product2.save();
// product3.save();

module.exports = Users;
