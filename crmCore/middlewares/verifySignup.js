/**
 * This file will have the logic to validate the incoming request body
 */
const User = require('../models/user_model');

validiateSignUpRequest  = async(req,res,next) =>{
    if(!req.body.name){
       return res.status(400).send({
            message : 'name must be present'
        })
    }
    if(!req.body.email){
        return res.status(400).send({
             message : 'email must be present'
         })
     }else if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : 'email is not valid'
        })
     }
     try {
        let email = await User.findOne({email : req.body.email})
        if(email!=null){
            return res.status(400).send({
                message : 'email id already taken'
            })
        }
     } catch (error) {
        return  res.status(500).send({
            message : 'some internal error happened'
        })
     }
    if(!req.body.userType){
        return res.status(400).send({
             message : 'userType must be present'
         })
     }else if(!req.body.userType == 'ADMIN'){
        return res.status(400).send({
            message : ' Admin userType cannot be created'
        })
     }
    if(!req.body.userId){
        return res.status(400).send({
             message : 'userId must be present'
         })
     }
     else {
        try {
            const user = await User.findOne({userId : req.body.userId})
            if(user!=null){
                return res.status(400).send({
                    message : 'userId already taken'
                })
            }
            
         } catch (error) {
            return  res.status(500).send({
                message : 'some internal error happened'
            })
         }
     }
     if(!req.body.password){
        return res.status(400).send({
            message : 'Failed. password must be present'
        })
     }
        else if(!req.body.password.length>10){
        return res.status(400).send({
            message : 'Failed. password must be greater than 10'
        })
     } 
     if(!isValidPassword(req.body.password)){
        return res.status(400).send({
            message : 'Failed. password must contain one lower,one upper and  one special charcter'
        })
     }
     next();
}

validiateSignInRequest  = async(req,res,next) =>{
        if(!req.body.userId){
            return res.status(400).send({
                message : 'Failed. userId cannot be present'
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message : 'Failed. password cannot be present'
            })
        }
        next();
}
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

function isValidPassword(password){
    var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return passw.test(String(password));
}

module.exports = {
    validiateSignUpRequest,
    validiateSignInRequest
}