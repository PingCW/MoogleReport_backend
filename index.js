const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const intialDB = require('./initialDB');
const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;

//npm install nodemon --save-dev , no need to restart server everytime we change something
// set up express app

const app = express();
intialDB.function(mongoose);
const Message = intialDB.getMessage();
const User = intialDB.getUser();
mongoose.connect('mongodb://localhost:27017/');

app.use(bodyParser.json());

//login
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function(username,password,done){
        User.findOne({username:username}, function(err, user){
            if(err){return done(null,false);}

            if(!user){
                return done(null,false,{message:'Incorrect username.'});
            }

            //Bbcryopt
            if(!(user.password===password)){
                return done(null, false,{message:'Incorrect password.'});
            }

            return done(null,user);
        });
    }
));

app.post('/signup', function(req,res,next){
    let temp=new User(req.body);
    //find password and replace it with hash generate from bcrypt
    temp.save(function(err){
        if(err){
            console.log('Failed to create user');
            res.status(400).end();
        }else{
            res.status(201).end();
        }
    });

});

app.post('/login',passport.authenticate('local',{session:false}),(req,res,next)=>{
    //generate JWT and send it back
    res.send(200).end();
});
app.get('/clearDB',()=>{
    User.remove({}, function(err) { 
        console.log('collection removed') 
     });
    Message.remove({}, function(err) { 
        console.log('collection removed') 
     });

})

















// // initialize routes 
// app.use(routes);

// //error handling middlewares
// app.use(function(err,req,res,next){
//    // console.log(err);
//    res.status(422).send({error: err.message});
// });

//listen for requests
app.listen(process.env.port||3000, function(){
    console.log('now listening for requests');

});

