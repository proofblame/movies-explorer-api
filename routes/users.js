const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateProfile, getMe, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// Роуты регистрации и авторизации
routerUsers.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
routerUsers.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// Роуты защищенные авторизацией
// User routes
routerUsers.use(auth);
routerUsers.get('/users/me', getMe);
routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = routerUsers;
