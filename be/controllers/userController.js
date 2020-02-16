const UserModel = require('../models/userModel');

// get all registered users
module.exports.findUsers = (req, res) => {
  UserModel.find()
    .then((data) => {
      res.send({ users: data });
    })
    .catch((err) => { if (err) throw err; });
};

// user registration process
module.exports.userRegistration = async (mail, name, surname, phone, login, pwd) => {
  try {
    const newUser = await new UserModel({
      mail,
      name,
      surname,
      phone,
      login,
    });
    // hashing a pwd
    const hashedPwd = await newUser.hashingPwd(pwd);
    newUser.pwd = hashedPwd;
    const data = await newUser.save();
    return data;
  } catch (err) {
    if (err) throw err;
  }
};