const User = require('../models/userModel');

const loginUser = async (req, res) => {
  res.status(200).json({ msg: 'login success' });
};

const signupUser = async (req, res) => {
  res.status(200).json({ msg: 'signup success' });
};

module.exports = { loginUser, signupUser };
