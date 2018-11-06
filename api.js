const express = require('express');
const router = express.Router();
const User = require('../user');

router.get('/user',function(req,res,next){
    /*User.find({}).then(function(user){
    res.send(user);
    });*/
    User.geoNear(
        {type: 'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(user){
        res.send(user);
    });
});

router.post('/user',function(req,res,next){
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
});

router.put('/user/:id',function(req,res,next){
    res.send({type:'PUT'});
});

router.delete('/user/:id',function(req,res,next){
    res.send({type:'DELETE'});
});

module.exports = router;