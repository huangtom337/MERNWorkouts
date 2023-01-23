const userModel = require('../models/userSchema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//create JWT token for use auth
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

//handles user login route
const user_login = async (req, res) => {
  const { email, password } = req.body;

  userModel
    .login(email, password)
    .then((result) => {
      const token = createToken(result._id);
      res.status(200).json({ email, token });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

//handles user sign up route
const user_signup = async (req, res) => {
  const { email, password } = req.body;

  console.log('reached');

  userModel
    .signup(email, password)
    .then((result) => {
      const token = createToken(result._id);
      res.status(200).json({ email, token });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = { user_login, user_signup };
