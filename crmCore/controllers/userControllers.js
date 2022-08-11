const User = require('../models/user_model');
const { userType } = require('../utils/constant');
const { convertObjects } = require('../utils/objectConvertor');


exports.findAll = async(req,res) => { 
    try {
        let searchObj = {}

        if(req.query.userType){
            searchObj.userType = req.query.userType
        }
        if(req.query.userStatus){
            searchObj.userStatus = req.query.userStatus
        }
        const users = await User.find(searchObj);
        res.status(200).send(convertObjects(users));
    } catch (error) {
        res.status(500).send({
            message : 'internal error happened'
        })
    }
}

/**
 * only admin and the particular user is allowed to get this. 
 */
exports.findByUserId = async (req,res)=>{
try {
    const user = await User.find({userId : req.params.id});
    if(user){
        return res.status(200).send(convertObjects(user));
    }

} catch (error) {
    res.status(500).send({
        message : 'internal error happened'
    })
}
}


exports.update = async(req,res)=>{
    try {
        const user = await User.findOne({userId : req.params.id})
        user.name = req.body.name ? req.body.name : user.name;

        //only admin can update userType and userStatus
        if(req.isAdmin == true){
            user.userType = req.body.userType ? req.body.userType : user.userType;
            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
        }

        const updatedUser = await user.save();
        return res.status(200).send({
            name  : updatedUser.name,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus
        });
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : 'internal error happened'
        })
    }
}