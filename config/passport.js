const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User

module.exports = passport => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
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
