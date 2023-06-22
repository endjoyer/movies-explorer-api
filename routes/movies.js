const router = require('express').Router();
const { validateCreateMovie } = require('../middlewares/celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateAuth } = require('../middlewares/validateAuth');

router.get('/movies', validateAuth, getMovies);

router.post('/movies', validateAuth, validateCreateMovie, createMovie);

router.delete('/movies/:movieId', validateAuth, deleteMovie);

module.exports = router;
