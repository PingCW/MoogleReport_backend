const express = require('express');
const jwt = require('jsonwebtoken');
const Messages = require('./../model/message')
const router = express.Router();
const passport = require('passport');
const auth = require('./../auth/auth')
const UserModel = require('../model/model');
auth.initalize(passport);

router.post('/signup' ,async(req, res, next) => {
    try{
        const user = await UserModel.create({
            email:req.body.email,
            password:req.body.password});
        res.status(201).end()
    }catch(err){
        res.status(400).end()
    }
  });

// router.post('/login',async(req,res,next) =>{
//     passport.authenticate('login',async(err,user, info)=>{
//         try{
//             if(err||!user){
//                 const error = new Error('An Error occured');
//                 return next(error);
//             }
//             req.login(user,{session:false},async(error)=>{
//                 if(error) return next(error);
//                 const body = {_id:user._id,email:user.email};
//                 const token = jwt.sign({user:body},'top_secret');
//                 return res.json({token});
//             }); 
//         }catch (error){
//             return next(error);
//         }
//     })(req,res,next);
// });

router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
    console.log(req.user);
    let token = jwt.sign({ email: req.user.email }, 'top_secret', {
        expiresIn: '7d'
    })

    res.send({
        token
    }).status(200).end();
})

// router.post('/message',(req,res,next)=>{ 
//     Messages.create({receiver:req.body.receiver, message:req.body.message},
//         function(err,message){
//             if(err) return res.status(500).send("Problem posting message");
//             res.status(200).send(message);
//     });
// });

// router.post('/message', (req, res) => {
//     return res.status(200).send("ok").end();
// });

// router.get('/message',passport.authenticate('jwt'),(req,res)=>{ 
//     Messages.find({receiver:req.body.receiver},
//         function(err,message){
//             if(err) return res.status(500).send("Problem receiving message");
//             res.status(200).send(message);
//     });
// });

module.exports = router