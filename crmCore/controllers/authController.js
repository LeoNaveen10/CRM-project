/**
 * signup
 */
const bcrypt = require('bcrypt')
const User = require('../models/user_model')
const { userType,userStatus } = require('../utils/constant');

exports.signup = async(req,res)=>{
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8), //8 is a salt here
        userType : req.body.userType
    }
    if(req.body.userType == userType.customer){
        userObj.userStatus = userStatus.approved
    }
    if(userObj.userType == userType.engineer){
        userObj.userStatus = userStatus.pending
    }
   
 try {
  const userCreated= await User.create(userObj);
    const response  = {
        name : userCreated.name,
        userid : userCreated.userId,
        email : userCreated.email,
        userType : userCreated.userType,
        userStatus : userCreated.userStatus,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
    res.status(201).send(response);
 } catch (error) {
   console.log('error happened', error.message);
   res.status(500).send({
    message : 'some internal error happened'
   })  
 }

}

/**
 * logic for signin
 */
const jwt = require('jsonwebtoken');
const secret = require('../config/secret')

exports.signIn = async(req,res) =>{

    /**
     * check userId
     */
    try {
        let user = await User.findOne({userId : req.body.userId})
    if(user ==null){
        return res.status(400).send({
            message : 'userId passed is wrong'
        })
    }
    /**
     * check password
     */
    const passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
    if(!passwordIsValid){
        return res.status(401).send({
            message : 'password is not matched'
        })
    }

    if(user.userStatus == userStatus.pending){
        return res.status(400).send({
            message : 'not yet approved by admin'
        })
    }
    /**
     * create JWT token
     */
    const token = jwt.sign({ id : user.userId}, secret.secret, {expiresIn: 600})
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({     
            message : 'server error happened'
        })
    }
    
}