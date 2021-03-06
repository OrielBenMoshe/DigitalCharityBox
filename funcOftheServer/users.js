const { models } = require("../models");

exports.addUser = async (req, res) => {
  console.log("req.body", req.body);
  const newUser = new models.usersSchema({
    UIDfirebase: req.body.UIDfirebase,
    personalInfo: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      email: req.body.email,
      city: req.body.city,
      address: req.body.address,
    },
  });
  try {
    await newUser.save();
    res.send(newUser);
    console.log("addnewUser");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.listUsers = async (req, res) => {
  const listUsers = await models.usersSchema.find();
  try {
    res.send(listUsers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.userConnected = async (req, res) => {
  const userId = req.params.id;
  const userConnected = await models.usersSchema.find({
    UIDfirebase: userId,
  });
  try {
    res.send(userConnected);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editUser = async (req, res) => {
  const userId = req.params.id;
  let updateValues = { $set: {} };
  if (req.body.uidFirebase)
    updateValues.$set["uidFirebase"] = req.body.uidFirebase;

  if (req.body.nameUser) updateValues.$set["nameUser"] = req.body.nameUser;
  if (req.body.mailUser) updateValues.$set["mailUser"] = req.body.mailUser;
  if (req.body.phoneUser) updateValues.$set["phoneUser"] = req.body.phoneUser;

  if (req.body.receivingMessages)
    updateValues.$set["receivingMessages"] = req.body.receivingMessages;
  else updateValues.$set["receivingMessages"] = false;
  if (req.body.receivingWTS)
    updateValues.$set["receivingWTS"] = req.body.receivingWTS;
  else updateValues.$set["receivingWTS"] = false;

  if (req.body.msgSearchApartment)
    updateValues.$set["msgSearchApartment"] = req.body.msgSearchApartment;
  else updateValues.$set["msgSearchApartment"] = false;
  if (req.body.areaSearchApartment)
    updateValues.$set["areaSearchApartment"] = req.body.areaSearchApartment;
  else updateValues.$set["areaSearchApartment"] = "";
  if (req.body.msgSaleApartment)
    updateValues.$set["msgSaleApartment"] = req.body.msgSaleApartment;
  else updateValues.$set["msgSaleApartment"] = false;
  if (req.body.areaSaleApartment)
    updateValues.$set["areaSaleApartment"] = req.body.areaSaleApartment;
  else updateValues.$set["areaSaleApartment"] = "";

  try {
    await models.usersSchema.findByIdAndUpdate(userId, updateValues),
      res.status(200).send(console.log(updateValues));
  } catch (err) {
    res.status(500).send(err);
  }
};
