const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// method-override
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send('Hello World.')
})

// routers
app.use(require('./routes/home'))
app.use(require('./routes/record'))
app.use(require('./routes/user'))

app.listen(3000, () => {
    console.log('App is listening.')
})