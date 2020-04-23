const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    return res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
    })(req, res, next)
})

router.get('/register', (req, res) => {
    return res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    if (!email || !password || !password2) {
        errors.push('email與密碼欄位是必填')
    }

    if (password !== password2) {
        errors.push('密碼輸入不相符')
    }

    if (errors.length > 0) {
        res.render('register', { name, email, password, password2 })   // 設好message時要加errors
    } else {
        User.findOne({ where: { email: email } }).then(user => {
            if (user) {
                errors.push('此email已註冊過')
                res.render('register', { errors, name, email, password, password2 })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash

                        newUser
                        .save()
                        .then(user => res.redirect('/'))
                        .catch(err => console.log(err))
                    })
                })
            }
        })
    }
})

router.get('/logout', (req, res) => {
    req.logout()
    // req.flash('success_msg', '你已成功登出')
    return res.redirect('/users/login')
})

module.exports = router