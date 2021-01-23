const {Router} = require('express')
let passport = require('passport')
let router = Router();

router.get('/', (req, res ,next)=>{
    res.render('index')
})

router.get('/signup', (req, res , next)=>{
    res.render('signup')
})

router.post('/signup',passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/signin', (req, res , next)=>{
    res.render('signin')
})
//app.use => use siempre se ejecuta primero antes que get p post 

router.use((req, res, next)=>{
    isAuthenticated(req, res, next)
     next();
})
router.get('/logout', (req, res, next)=>{
    //req.logout logout es una funsion de passport 
    req.logout();
    res.redirect('/')
})
router.get('/profile', (req, res ,next)=>{
    res.render('profile')
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/signin')
}
module.exports = router