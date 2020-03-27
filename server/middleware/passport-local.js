const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')
const User = require('../models/User');

module.exports = passport => {
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })

    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', session: false },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) return done(null, false, { message: 'User is not exist' })

                bcrypt.compare(password, user.password, (err, isMath) => {
                    if (err) throw err
                    if (isMath) return done(null, user)
                    return done(null, false, { message: 'Password is incorrect' })
                })
            } catch (e) {
                return res.status(401).json({ message: 'Auth is null' })
            }
        })
    )

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
        (jwtPayload, done) => {
            try {
                console.log(`JwtPlayload: ${jwtPayload}`)
                const user = User.findOne({email: jwtPayload.email})
                if (user) done(null, user)
                else done(null, false)
            } catch (e) {
                done(e, false)
            }
        }));

        // passport.use(new JwtStrategy({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        //     // jwtFromRequest: (req) => {
        //     //     const token = null
        //     //     if (req && req.cookies) token = req.cookies['jwt']
        //     //     return token
        //     // },
        //     secretOrKey: process.env.JWT_SECRET
        // },
        //     (jwtPayload, done) => {
        //         try {
        //             console.log(`JwtPlayload: ${jwtPayload}`)
        //             const user = User.findOne({email: jwtPayload.email})
        //             if (user) done(null, user)
        //             else done(null, false)
        //         } catch (e) {
        //             done(e, false)
        //         }
        //     }));
}
