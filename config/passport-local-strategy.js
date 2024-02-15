const { Admin } = require('mongodb');
const passport = require('passport');

const passportlocal = require('passport-local').Strategy;

const adminmodel = require('../models/admin');


passport.use(new passportlocal({
    usernameField : 'email'
}, async (email,password,done)=>{
    let AdminData = await adminmodel.findOne({email:email});
    if(AdminData){
    console.log(email,password);

        if(password == AdminData.password)
        {
            console.log('login susscefully');
            return done (null,AdminData)
        }
        else{
            console.log('incorrent password');
            return done(null,false)
        }

    }
    else{
        console.log('invalid email');
        return done(null,false)
    }
}))

passport.serializeUser(async(user,done)=>{
    return done (null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let adminRecord = await adminmodel.findById (id);
    if(adminRecord){
        return done (null,adminRecord)
    }
    else{
        return done(null,false)
    }
})

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next ()
}

passport.checkAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else{
        return res.redirect('/admin/')
    }
}






module.exports = passport