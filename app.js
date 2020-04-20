const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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

app.get('/', (req, res) => {
    res.send('Hello World.')
})

// routers
app.use(require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users', require('./routes/user'))

app.listen(3000, () => {
    console.log('App is listening.')
})