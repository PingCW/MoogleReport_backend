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

router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
    console.log(req.user);
    let token = jwt.sign({ email: req.user.email }, 'top_secret', {
        expiresIn: '7d'
    })

    res.send({
        token
    }).status(200).end();
})

module.exports = router