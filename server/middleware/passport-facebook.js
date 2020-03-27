const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User')

module.exports = () => {
    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/facebook/redirect'
        }, async (accessToken, refreshToken, user, done) => {
            const currentUser = await User.findOne({ facebookId: user.id })
            if (currentUser) {
                console.log(`user is: ${currentUser}`)
                done(null, currentUser)
            }

            const newUser = new User({
                name: user.displayName,
                facebookId: user.id
            })
            await newUser.save()
            console.log(`New user created: ${newUser}`)
            done(null, newUser)
        }))
}