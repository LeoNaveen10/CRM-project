const mongoose = require('mongoose')
const { ticketStatus } = require('../utils/constant')


const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ticketPriority :{
        type  : Number,
        required : true,
        default : 4
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : [ticketStatus.open,ticketStatus.closed,ticketStatus.blocked],
        default : ticketStatus.open
    },
    reporter : {
        type : String,
        required : true
    },
    assignee : {
        type : String
    },
    createdAt : {
        type  : Date,
        default : () => Date.now()
    },
    updatedAt : {
        type  : Date,
        default : () => Date.now()
    }
},{versionKey:false})

module.exports = mongoose.model('Ticket',ticketSchema);