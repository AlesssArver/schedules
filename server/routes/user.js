const userRouter = require('express').Router()
const userController = require('../controllers/user')

userRouter.get('/settings', userController.settings)

module.exports = userRouter