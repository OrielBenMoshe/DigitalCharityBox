const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  creatDate: {
    type: Date,
    default: Date.now,
  },
//   token: {
//     type: String,
//     required: true,
//     select: false
//   },
  personalInfo: {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      unique: true,
    },
    city: String,
    address: String,
  },
  craditCardInfo: {
    token: String,
    last4digits: String,
  },
  reminders: {
    morning: {
      active: Boolean,
      time: String,
    },
    afternoon: {
      active: Boolean,
      time: String,
    },
  },
  display: {
    coins: [
      { value: Number, active: true },
      { value: Number, active: true },
      { value: 5, active: true },
      { value: 10, active: true },
    ],
  }
});
