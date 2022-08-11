const mongoose = require('mongoose');
const { status } = require('../utils/utils');


const notificationSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    },
    recepientEmails : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    requester : {
        type : String
    },
    status : {
        type : String,
        default : status.unsent,
        enum : [status.sent,status.unsent]
    },
    createdAt : {
        type : Date,
        immutable  : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    }
})

module.exports =  mongoose.model('notification',notificationSchema);