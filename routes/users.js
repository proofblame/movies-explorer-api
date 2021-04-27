const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateProfile, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// Роуты защищенные авторизацией
// User routes
router.use(auth);
router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;
