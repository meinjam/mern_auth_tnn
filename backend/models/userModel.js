const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled.');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email.');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password.');
  }

  return user;
};

userSchema.statics.signup = async function (name, email, password) {
  // validation
  if (!email || !password || !name) {
    throw Error('All fields must be filled.');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough.');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });
  return user;
};

module.exports = mongoose.model('User', userSchema);
