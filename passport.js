const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'passwd'
},
    function(username,password,done){
        User.findOne({username:username}, function(err, user){
            if(err){return done(err);}

            if(!user){
                return done(nunll,false,{message:'Incorrect username.'});
            }

            if(!user.validPassword(password)){
                return done(null, false,{message:'Incorrect password.'});
            }

            return done(null,user);
        });
    }
));