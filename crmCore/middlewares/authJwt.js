const jwt = require('jsonwebtoken');
const secret = require('../config/secret')
const User = require('../models/user_model');
const { userType } = require('../utils/constant');

exports.verifyToken =(req,res,next)=>{
    // console.log(req);
    let token = req.headers['x-accesstoken'];


    if(!token){
        return res.status(403).send({
            message : 'no token  is provided'
        })
    }
    jwt.verify(token,secret.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : 'unauthorized'
            })
        }
        else {
            req.userId = decoded.id;
            next();
        }
    })
}


exports.isAdmin =async (req,res,next)=>{

    try {
        const user = await User.findOne({userId : req.userId})
        if(user.userType != userType.admin){
            return res.status(400).send({
                message : 'only admin can access these records'
            })
        }  
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message : 'Server error'
        })
    }
    next();
}

exports.isvalidUserIdInReqParams = async (req,res,next)=>{
    try {
        const user = await User.findOne({userId : req.params.id});
        if(user==null){
            return res.status(400).send({
                message : 'Entered  userId is not valid'
            }) 
        }
    } catch (error) {
        return res.status(500).send({
            message : 'Server error'
        })
    }
    next();
}

exports.isAdminOrCustomer =async (req,res,next)=>{
    try {
        const user = await User.findOne({userId : req.userId});

        if(!(user.userId==req.params.id||user.userType==userType.admin)){
            return res.status(400).send({
                message : 'only own account holder can watch this infos'
            })
        }
        user.userType==userType.admin ? req.isAdmin = true : req.isAdmin = false;
        
    } catch (error) {
        return res.status(500).send({
            message : 'Server error'
        })
    }
    next();
}
