const mongoose = require('mongoose');

const urlRegex = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'Incorrect link format',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'Incorrect link format',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'Incorrect link format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
