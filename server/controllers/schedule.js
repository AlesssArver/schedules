const Schedule = require('../models/Schedule')

exports.schedules = async (req, res) => {
    try {
        const scheduleItems = await Schedule.find({ owner: req.userId })
        res.json(scheduleItems)
        // console.log(req.cookies)
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.', cookie: req.cookies, user: `User: ${req.userId}` })
    }
}

exports.schedule = async (req, res) => {
    try {
        const scheduleItem = await Schedule.findOne({ owner: req.userId })
        console.log(scheduleItem)
        console.log(`Cookies: ${req.cookies}`)
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.create = (req, res) => {
    const scheduleItem = new Schedule({
        title: req.body.title,
        date: new Date(),
        owner: req.userId
    })
    console.log(scheduleItem)
    scheduleItem.save()
}

exports.edit = (req, res) => {
    try {
        Schedule.findOneAndUpdate(
            { _id: req.params._id },
            {
                title: req.body.title,
                date: req.body.date
            })
            console.log('SCHEDULE EDITED')
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.delete = async (req, res) => {
    try {
        Schedule.findOneAndDelete(req.params._id)
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}