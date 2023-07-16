const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = require('../utils/secretKey');

const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
} = require('../utils/errors');
const {
  noUser,
  alreadyRegister,
  castObjectId,
  invalidUserRequest,
  incorrect,
} = require('../utils/errorsTest');

module.exports.getUserInfo = (req, res, next) => {
  let userId;

  if (req.params.id) {
    userId = req.params.id;
  } else {
    userId = req.user._id;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(`${noUser} "${userId}"`));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(castObjectId));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(alreadyRegister));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(invalidUserRequest));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(incorrect));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new UnauthorizedError(incorrect));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : secretKey,
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      });
    })
    .catch(next);
};

module.exports.exit = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
};

module.exports.patchUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(invalidUserRequest));
      }

      if (err.code === 11000) {
        return next(new ConflictError(alreadyRegister));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`${noUser} "${userId}"`));
      }

      return next(err);
    });
};
