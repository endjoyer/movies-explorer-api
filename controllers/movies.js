const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid movie request data'));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  console.log(typeof movieId);

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(
          new NotFoundError(`There is no movie with id "${movieId}".`),
        );
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You can't delete someone else's movie"),
        );
      }
      return movie
        .deleteOne()
        .then(() => res.send({ message: 'Movie deleted.' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError(`Cast to ObjectId failed ${movieId} ${err}`),
        );
      }
      return next(err);
    });
};
