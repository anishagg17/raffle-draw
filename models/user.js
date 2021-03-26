const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'not an email'
    }
  },
  password: {
    type: String,
    required: true
  },
  tickets: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
