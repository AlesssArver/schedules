const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
require('./middleware/passport-local')(passport)
require('./middleware/passport-google.js')(passport)
// require('./middleware/passport-facebook')
// require('./middleware/passport-vkontakte')

const app = express()

app.use(cookieParser())

app.use(express.json({ extended: true }))

app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routes/auth'))
app.use(
    '/api/schedule',
    // passport.authenticate('jwt', { session: false }),
    require('./routes/schedule')
)
// app.use(
//     '/todos',
//     passport.authenticate('jwt', { session: false }),
//     require('./routes/todo')
// )
app.use('/api', require('./routes/user'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', '.nuxt', 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', '.nuxt', 'dist', 'server', 'index.ssr.html'))
    })
}

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(`Server error: ${e}`)
        process.exit(1)
    }
}
start()