const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const secretKey = require('../utils/secretKey');
const { authReq } = require('../utils/errorsTest');

module.exports.validateAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : secretKey,
    );
  } catch (err) {
    return next(new UnauthorizedError(authReq));
  }

  req.user = payload;

  return next();
};
