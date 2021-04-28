const routerMovies = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

// Movie routes
routerMovies.use(auth);
routerMovies.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле должно быть ссылкой');
        }),
      trailer: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле должно быть ссылкой');
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле должно быть ссылкой');
        }),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

routerMovies.get('/movies', getMovies);
routerMovies.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = routerMovies;
