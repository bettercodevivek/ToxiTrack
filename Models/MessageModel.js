const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId:String,
    username:String,
    message:String,
    score:Number,
    isToxic:Boolean,
    timeStamp:{type:Date,default:Date.now}
});

const Message = mongoose.model('Message',MessageSchema);

module.exports = Message;