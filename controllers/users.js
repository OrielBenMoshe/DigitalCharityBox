const { models } = require("../models");

module.exports = {
  addUser: async (req, res) => {
    // console.log("req.body", req.body);
    const newUser = new models.usersSchema({
      firebaseUID: req.body.firebaseUID,
      costumerInfo: {
        id: req.body.customerId,
        lastDigits: req.body.lastDigits,
        expirationMonth: req.body.expirationMonth,
        expirationYear: req.body.expirationYear,
      },
      personalInfo: {
        fullName: req.body.displayName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
      },
      display: {
        coins: [
          { value: 1, active: true },
          { value: 2, active: true },
          { value: 5, active: true },
          { value: 10, active: true },
          { value: 18, active: false, manual: true },
        ],
      },
      reminders: [
        { label: "בשחרית", time: "8:15", active: false },
        { label: "במנחה", time: "18:05", active: false },
        { label: "בזמן אחר", time: "11:00", active: false },
      ],
    });
    try {
      await newUser.save();
      res.send(newUser);
      console.log("New User Added to DB!");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  listUsers: async (req, res) => {
    try {
      const listUsers = await models.usersSchema.find();
      // console.log('listUsers:', listUsers);
      if (res) {
        res.status(200).json({
          isSucceed: true,
          message: `${listUsers.length} users is found.`,
          users: listUsers,
        })
      } else {
        return {
          isSucceed: true,
          message: `${listUsers.length} users is found.`,
          users: listUsers,
        }
      }
    } catch (err) {
      if (res) {
        console.log(err);
        res.status(500).send(err)
      } else
        return {
          isSucceed: false,
          message: err.message
        }
    }
  },

  findUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const findUser = await models.usersSchema.findOne({
        firebaseUID: userId,
      });
      // console.log("findUser:", findUser);
      findUser
        ? res.status(200).json({
            isSucceed: true,
            message: `The User with UID: '${userId}' is founded in DB.`,
            user: findUser,
          })
        : res.status(200).json({
            isSucceed: false,
            message: `The User with UID: '${userId}' is not found in DB.`,
          });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const where = req.body.where;
    const value = req.body.value;
    const update = { [where]: value };
    // console.log("update from controller:", update);
    try {
      const user = await models.usersSchema.findOne({ _id: userId });
      if (user) {
        user[where] = value;
        await user.save();
        res.status(200).json({
          isSucceed: true,
          message: `The '${where}' of User ID Number ${userId}, updated to: ${JSON.stringify(
            value
          )}.`,
          user,
        });
      } else {
        res.status(406).json({
          isSucceed: false,
          message: `The user with UID '${userId}' does not exist in the database. Please remove the user from the LocalStorage.`,
        });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
