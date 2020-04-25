const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production') { 
    require('dotenv').config()
}

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// require model
const db = require('./models')
const Record = db.Record
const User = db.User

// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// passport 
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// flash
app.use(flash())

app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

// routers
app.use(require('./routes/home'))
app.use('/expenses', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// 輸入無效網址時處理錯誤
app.use((req, res) => {
    if (res.headersSent) {
       return next()
    }
    return res.status(404).send('無效的網址，重新輸入 localhost:3000/')   
})

app.listen(3000, () => {
    console.log('App is listening.')
})