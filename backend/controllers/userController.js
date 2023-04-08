const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  res.status(200).json({ msg: 'login success' });
};

const signupUser = async function (req, res) {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(500).json({ error: 'Email already in use' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: passwordHash, name });

  res.status(201).json({ email, user });
};

module.exports = { loginUser, signupUser };
