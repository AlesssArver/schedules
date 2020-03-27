const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')


module.exports = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL: '/auth/google/redirect',
        }, (accessToken, refreshToken, user, done) => {
            User.findOne({ googleId: user.id }).then(currentUser => {
                if (currentUser) {
                    console.log(`user is: ${currentUser}`)
                    done(null, currentUser)

                    // const token = await jwt.sign(
                    //   { userId: user._id },
                    //process.env.JWT_SECRET,
                    //   { expiresIn: '1h' }
                    // )
                }
                else {
                    new User({
                        googleId: user.id,
                        name: user.displayName,
                        email: req.user._json.email,
                        avatar: user._json.picture
                    }).save().then(newUser => {
                        console.log(`new user created: ${newUser}`)
                        done(null, newUser)
                    })
                }
            })
        }))
}
