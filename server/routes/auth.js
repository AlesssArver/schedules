const authRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const passport = require('passport');
const authController = require('../controllers/auth')

// Local login & register
authRouter.post(
  '/login', 
//   [
//   check('email', 'Input email correctly').normalizeEmail().isEmail(),
//   check('password', 'Input password').exists()
// ],
  passport.authenticate('local', { session: false }),
  authController.login
)
authRouter.post(
  '/register',
  // [
  //   check('email', 'Email is incorrent').normalizeEmail().isEmail(),
  //   check('password', 'Min password length is 6 characters').isLength({ min: 6 })
  // ],
  authController.register
)

// Google
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  authController.google
)
authRouter.get(
  '/google/redirecct',
  passport.authenticate('google', { successRedirect: 'http://localhost:8080/' }),
  authController.googleRedirect
)

// Facebook
authRouter.get(
  '/facebook',
  passport.authenticate('facebook'),
  authController.google
)
authRouter.get(
  '/facebook/redirecct',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:8080/' }),
  authController.facebookRedirect
)

// Vkontakte
authRouter.get(
  '/facebook',
  passport.authenticate('facebook'),
  authController.google
)
authRouter.get(
  '/facebook/vkontakte',
  passport.authenticate('vkontakte', { successRedirect: 'http://localhost:8080/' }),
  authController.vkontakteRedirect
)

module.exports = authRouter;