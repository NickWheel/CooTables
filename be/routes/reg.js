const express = require('express');
const Ajv = require('ajv');
const jwt = require('jsonwebtoken');
const { privateKey, publicKey } = require('../keys');
const userSchema = require('../schemas/userSchema');
const UserModel = require('../models/userModel');
const { findUsers, userRegistration } = require('../controllers/userController');


const router = express.Router();
const ajv = new Ajv();

/* POST registration page */
router.post('/', async (req, res) => {

  console.log('new user info ', req.body);

  const {
    mail, name, surname, phone, login, pwd,
  } = await req.body;

  // Validation
  const validate = await ajv.compile(userSchema);
  const valid = await validate(req.body);

  console.log(`VALIDATION: ${valid}`);
  if (!valid) {
    const { errors } = validate;
    const result = {
      status: 'you are invalid',
    };
    console.log(errors);
    res.json(result);
  } else {
    // registration process
    const newUser = await userRegistration(mail, name, surname, phone, login, pwd);
    console.log('newUser', newUser);
    // 30 min active token cookie
    let token = await jwt.sign({ id: newUser.id }, publicKey, { expiresIn: 1800000 });
    console.log('token', token);
    // 3 days refresh token cookie
    let refreshToken = await jwt.sign({ id: newUser.id }, publicKey, { expiresIn: 1000 * 60 * 60 * 24 *3 });
    console.log('refreshToken', refreshToken);
    res.cookie('token', token)
      .cookie('refreshToken', refreshToken);
    res.json('keks worked');
  }
});

module.exports = router;
