const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/User')

module.exports = () => {
    passport.use(
        new FacebookStrategy({
            clientID: process.env.VKONTAKTE_APP_ID,
            clientSecret: process.env.VKONTAKTE_APP_SECRET,
            callbackURL: '/facebook/redirect'
        }, async (accessToken, refreshToken, user, done) => {
            const currentUser = await User.findOne({ vkontakteId: user.id })
            if (currentUser) {
                console.log(`user is: ${currentUser}`)
                done(null, currentUser)
            }

            const newUser = new User({
                name: user.displayName,
                vkontakteId: user.id
            })
            await newUser.save()
            console.log(`New user created: ${newUser}`)
            done(null, newUser)
        }))
}