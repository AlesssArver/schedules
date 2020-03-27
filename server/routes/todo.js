const todoRouter = require('express').Router()
const todoController = require('../controllers/todo')

todoRouter.get('/todos', todoController.todos)
todoRouter.get('/todo', todoController.todo)

todoRouter.get('/create', todoController.create)

todoRouter.get('/todo/:id', todoController.todoEdit)
todoRouter.get('/todo/:id', todoController.todoDelete)

module.exports = todoRouter