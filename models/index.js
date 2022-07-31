const mongoose = require("mongoose");
const usersSchema = require("./usersSchema");

function connectToDb() {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected!');
});

const models = { usersSchema };

module.exports = { connectToDb, models };
