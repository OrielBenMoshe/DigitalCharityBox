const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  createdDate: { type: String, default: Date.now },
  firebaseUID: { type: String, required: true, unique: true },
  totalAmount: { type: Number, default: 0 },
  costumerInfo: {
    id: { type: String, required: true },
    lastDigits: { type: Number, required: true },
    expirationMonth: { type: Number, required: true },
    expirationYear: { type: Number, required: true },
  },
  personalInfo: {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: String,
    address: String,
  },
  display: {
    coins: [{ value: Number, active: Boolean, manual: Boolean }],
  },
  reminders: {
    type: [{ label: String, time: String, active: Boolean }],
    required: true,
  }
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
