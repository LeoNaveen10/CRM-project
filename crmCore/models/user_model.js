const mongoose = require('mongoose');
const { userStatus, userType } = require('../utils/constant');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    userType : {
        type : String,
        required : true,
        default  : userType.customer,
        enum : [userType.admin,userType.customer,userType.engineer]
    },
    userStatus : {
        type : String,
        required : true,
        default : userStatus.approved,
        enum : [userStatus.approved,userStatus.pending,userStatus.rejected]
    },
    //for easy access based on tickets cretead and assigned based on user, the below two documnets are used
    //for easier access in O(n) time
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    },
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }
})

module.exports = mongoose.model('user', userSchema);
