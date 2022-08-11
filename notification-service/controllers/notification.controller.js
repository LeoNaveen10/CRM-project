/**
 * controller to create notifiction
 */

const notificationModel = require("../models/notification.model")

exports.acceptNotificationRequest = async(req,res)=>{
    try {
        const obj = {
            subject : req.body.subject,
            recepientEmails : req.body.recepientEmails,
            content:req.body.content,
            requester : req.body.requester,
            status : req.body.status
        }
        const notifiction = await notificationModel.create(obj);
        
        return res.status(200).send({
            success : true,
            trackingId : notifiction._id
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('server error');
    }  
}

/**
 * controller to fetch the notification
 */

exports.getNotificationDetails = async (req,res)=>{
    
    try {
        client.post("http://localhost:8000/notiserv/api/v1/notifications", args, (data, res) => {

            console.log("Request sent");
            console.log(data);

        })
    } catch (err) {
        console.log(err.message);
    }
}