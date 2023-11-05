const router = require('express').Router();
const { validateCreateMovie } = require('../middlewares/celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateAuth } = require('../middlewares/validateAuth');

router.get('/api/v1/movies', validateAuth, getMovies);

router.post('/api/v1/movies', validateAuth, validateCreateMovie, createMovie);

router.delete('/api/v1/movies/:movieId', validateAuth, deleteMovie);

module.exports = router;
