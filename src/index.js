let express = require('express')
let engine = require('ejs-mate')
let path = require('path')
let morgan = require('morgan')
let passport = require('passport')
let session = require('express-session')
let flash = require('connect-flash')
//Initializations
app = express() 
require('./database')
require('./passport/local-auth')
//Settings
app.set('views', path.join( __dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(session({
    secret: 'lata',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')

    next();
})
//Routes
app.use(require('./routes/index.routes.js'))

app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
})