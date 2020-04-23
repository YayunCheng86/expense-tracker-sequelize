const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

// routers
app.use(require('./routes/home'))
app.use('/expenses', require('./routes/record'))
app.use('/users', require('./routes/user'))

app.use((req, res,next) => {
    app.locals.user = req.user
    app.locals.isAuthenticated = req.isAuthenticated()
})

app.listen(3000, () => {
    console.log('App is listening.')
})