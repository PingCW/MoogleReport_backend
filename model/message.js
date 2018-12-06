const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender:{
        type: String
    },
    receiver:{
        type: String
    },
    message:{
        type: String
    },

    isRead:{
        type: Boolean
    }
});

const Message = mongoose.model('Message',MessageSchema);
module.exports = Message;