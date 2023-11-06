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

router.get('/api/v1/users/me', validateAuth, getUserInfo);

router.get('/api/v1/signout', validateAuth, exit);

router.post('/api/v1/signup', validateCreateUser, createUser);

router.post('/api/v1/signin', validateLogin, login);

router.patch(
  '/api/v1/users/me',
  validateAuth,
  validateUpdateUser,
  patchUserProfile,
);

module.exports = router;
