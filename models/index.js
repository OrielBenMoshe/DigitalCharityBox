const mongoose = require("mongoose");
const usersSchema = require("./usersSchema");

function connectToDb() {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const models = { usersSchema };

module.exports = { connectToDb, models };
