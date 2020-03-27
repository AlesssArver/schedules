const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User')

exports.login = async (req, res) => {
    try {
        // Validation
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Data is incorrect'
            })
        }
        const { email, password } = await req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'User is not exist' })

        const isMath = await bcrypt.compare(password, user.password)
        if (!isMath) return res.status(400).json({ message: 'Password is incorrect' })

        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res
            .cookie("userData", token)
            .json({ message: 'U a logged in', token: 'JWT ' + token, userId: user._id })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Data is incorrect'
            })
        }

        const { email, password } = req.body;
        const candidate = await User.findOne({ email })

        if (candidate) return res.status(400).json({ message: 'User with this email already exist' })

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res
            .cookie("userData", token)
            .json({ message: 'User created', token: 'JWT ' + token, user })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong. Please, try again.' })
    }
}

exports.google = (req, res) => { }
exports.googleRedirect = (req, res) => { }

exports.facebook = (req, res) => { }
exports.facebookRedirect = (req, res) => { }

exports.vkontakte = (req, res) => { }
exports.vkontakteRedirect = (req, res) => { }