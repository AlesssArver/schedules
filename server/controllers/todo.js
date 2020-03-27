exports.todos = async (req, res) => {
    try {
        const todoItems = await Todo.find({ owner: req.user.userId })
        res.json(todoItems)
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.todo = async (req, res) => {
    try {
        const todoItem = await Todo.findById(req.params.id)
        res.json(todoItem)
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.create = (req, res) => {
    const todoItem = new Todo({
        title: req.body.title
    })
    todoItem.save()
}

exports.edit = (req, res) => { }

exports.delete = async (req, res) => {
    try {
        const todoItem = await Todo.findById(req.params.id)
        if (todoItem) {
            todoItem.remove()
            res.status(200).json({ message: 'schedule item is deleted' })
        }
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}