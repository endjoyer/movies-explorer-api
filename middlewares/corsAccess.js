const cors = require('cors');

module.exports = () => {
  cors({
    origin: [
      'http://localhost:3001',
      'http://movies.explorer.diploma.nomoreparties.sbs',
      'https://movies.explorer.diploma.nomoreparties.sbs',
    ],
    credentials: true,
    maxAge: 60,
  });
};
