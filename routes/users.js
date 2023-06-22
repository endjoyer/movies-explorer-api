const router = require('express').Router();
const {
  login,
  exit,
  createUser,
  getUserInfo,
  patchUserProfile,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
} = require('../middlewares/celebrate');
const { validateAuth } = require('../middlewares/validateAuth');

router.get('/users/me', validateAuth, getUserInfo);

router.get('/signout', validateAuth, exit);

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.patch('/users/me', validateAuth, validateUpdateUser, patchUserProfile);

module.exports = router;
