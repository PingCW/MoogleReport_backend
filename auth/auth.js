const localStrategy = require('passport-local').Strategy;
const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/model');


function initalize(passport){
    passport.use(new localStrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async(email,password, done)=>{
        try{
            const user = await UserModel.findOne({email});
            if(!user){
                return done(null,false,{message:'User not found'});
            }   
            const validate = await user.isValidPassword(password);
            if(!validate){
                return done(null,false,{message : 'Wrong Password'});
            }
            return done(null,user,{message : 'Logged in Successfuly'});
        }catch(error){
            return done(error);
        }
    }))

    passport.use(new JWTstrategy({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'top_secret'
    }, async(payload, done)=>{
        let user = await UserModel.findOne({email:payload.email})

        if(!user){
            return done(null, false);
        }else{
            return done(null,user);
        }
    }))
}

module.exports={
    initalize:initalize
}