const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const RegisterModel = require('../models/RegisterModel');

passport.use(new passportLocal({
    usernameField : 'email'
},async(useremail,userpassword,done)=>{
    let user = await RegisterModel.findOne({email : useremail});
    if(!user || user.password != userpassword){
        console.log("Email and Password not found");
        return done(null,false);
    }   
    return done(null,user);
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    RegisterModel.findById(id,(err,user)=>{
        if(err){
            console.log(err);
            return done(null,false);
        }
        return done(null,user);
    })
});

passport.chekAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){      
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.userLogin = req.user
    }
    return next();
}


module.exports = passport;