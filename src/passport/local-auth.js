let passport = require('passport')
let LocalStrategy =  require('passport-local').Strategy;
let User = require('../models/user')
//serializar datos 
passport.serializeUser((user, done )=>{
    done(null, user.id)
})
passport.deserializeUser(async(id, done )=>{
    await User.findById(id)
    done(null, User);
})
passport.use('local-signup', new LocalStrategy({
//El objeto sirve para ver que tipo de objeto vamos a resivir desde el cliente 
    usernameField: 'email',
    passworFiel: 'pasword',
    passReqToCallback: true
}, //la funcion sirve para ver que vamos a hacer con los datos del pbjeto 
async (req, email, password, done)=>{
    
    let user = await User.findOne({email:email})
    if (user){
        return done(null, false, req.flash('signupMessage', 'The email is already taken.'))

    }else{
    let newUser = new User ()
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password)
    await newUser.save();
    done(null, newUser)
    }


}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passworFiel: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
   let user = await User.findOne({email: email})
   if (!user){
       return done (null, false, req.flash('signinMessage', 'No user found.'))
   }
   if (!user.comparePassword(password)){
    return done(null, false, req.flash('signinMessage','Incorrect password'))
   }
    return done(null, user)
}))