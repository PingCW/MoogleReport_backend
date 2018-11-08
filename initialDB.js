// const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let User,Message;

// initializing customized database
// Remember to remove all data from database after modified Schema

function initDB(mongoose){
    let UserSchema=new Schema({
        username: {type:String, required:true, unique:true, trim:true},
        password: {type:String, required:true, unique:false, trim:true},
        name: {type:String, required:true, unique:true, trim:true}
    });

    let messageSchema = new Schema({
        sender: String,
        receiver: String,
        encryptedMassage: String,
        tag: String,
        key: String
    });

    User = mongoose.model('User',UserSchema);
    Message = mongoose.model('Message',messageSchema);
};
function getUser(){
    return User;
}
function getMessage(){
    return Message;
}

module.exports = {
    function: initDB,
    getUser:getUser,
    getMessage:getMessage
};