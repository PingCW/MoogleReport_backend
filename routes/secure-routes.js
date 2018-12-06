const express = require('express');
const router = express.Router();
const MessageModel=require('./../model/message');


router.post('/message',(req,res)=>{
    let to=req.body.receiver;
    let from =req.body.sender;
    let message0=req.body.message;
    let isRead0=false;

    if(to!=undefined &&!!to.trim() && from!=undefined &&!!from.trim()){
        const data = {
            sender:from,
            receiver:to,
            message:message0,
            isRead:isRead0
        }

        MessageModel.create(data, function(err,message){
            if(err){
                console.error(err);
            }else {
                console.log(data);
            }
        });
    }
    res.send();
    res.status(201).end();
});

router.get('/message',(req,res)=>{
    MessageModel.findOneAndUpdate({receiver:req.user.email},{isRead:true},function(err,message){
        if(err){return console.log(err)} else {
            message = req.body.message;
        }
    })
    res.send();
    res.status(201).end();
});

module.exports = router;