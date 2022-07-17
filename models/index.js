const mongoose = require("mongoose");
const usersSchema = require("./usersSchema");

// שליחה לDB מקומי
// function connectToDb() {
//   return mongoose.connect("mongodb://localhost/a", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
// }

// שליחה לDB אטלס
function connectToDb() {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

const models = { usersSchema };

module.exports = { connectToDb, models };
