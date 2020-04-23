const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

module.exports = passport => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Email and Password incorrect' })
                }
            })
        })
        .catch(err => { return console.error(err) })
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            user = user.get()
            done(null, user)
        })
    })
}
