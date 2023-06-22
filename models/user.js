const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Incorrect mail format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('User', userSchema);
