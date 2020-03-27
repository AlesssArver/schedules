const scheduleRouter = require('express').Router()
const scheduleController = require('../controllers/schedule')

scheduleRouter.get('/', scheduleController.schedules)
scheduleRouter.get('/:id', scheduleController.schedule)

scheduleRouter.post('/create', scheduleController.create)

scheduleRouter.put('/:id', scheduleController.edit)
scheduleRouter.delete('/:id', scheduleController.delete)

module.exports = scheduleRouter