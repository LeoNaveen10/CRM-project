/**
 * Any authenticated user will be able to create tickets
 * 
 * middleware to check body request
 * 
 * 
 * after creation, customer and enginner documents also  gets updated
 */

const { urlencoded } = require("body-parser");
const Ticket = require("../models/ticket.model");
const User = require("../models/user_model");
const { userType, userStatus } = require("../utils/constant")
const sendNotificationReq = require('../utils/notificationClient');


exports.createTicket = async(req,res)=>{
 try {
    const ticketObj = {
        title :  req.body.title,
        ticketPriority : req.body.ticketPriority,
        description : req.body.description,
        status : req.body.status,
        reporter :  req.userId
    }

    //find the engineer using userType and userStatus
    const engineer = await User.findOne({
        userType : userType.engineer,
        userStatus : userStatus.approved
    })

    if(engineer){
        ticketObj.assignee = engineer.userId
        await engineer.save();
    }

    const ticketCreated = await Ticket.create(ticketObj);
    

    if(ticketCreated){

        const customer =await User.findOne({
            userId : req.userId
        
    })
    console.log(customer);
        //update the  customer document
        customer.ticketsCreated.push(ticketCreated._id);
        await customer.save();

        //update the  engineer document
        if(engineer){
            engineer.ticketsAssigned.push(ticketCreated._id)
            await engineer.save();
        }
         //Now we should send the notification request to notificationService
            /**
             * Enrich the content of the email content
             */
 sendNotificationReq(`Ticket created with id : ${ticketCreated._id}` , `Ticket have been created for ${ticketCreated.title}`,`${ticketCreated.reporter},${ticketCreated.assignee},naveensundar313@gmail.com`, "CRM APP");

    return res.status(200).send(ticketCreated);

    }
 } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
 }
    
}

exports.getTicket = async (req,res)=>{
    try {
        const user = await User.findOne({userId : req.userId});
        let queryobj = {};
        const ticketCreatedTemp = user.ticketsCreated;
        if(user.userType == userType.customer){
         
           if(user.ticketsCreated.length==0){
            return res.status(400).send({
                message : 'tickets not yet been created'
            })
           }

           queryobj['_id'] = { $in : ticketCreatedTemp };
        }
        else if(user.userType == userType.engineer){
            if(ticketCreatedTemp.length==0 && user.ticketsAssigned==0){
                return res.status(400).send({
                    message : 'tickets not yet been created or assigned'
                })
               }
               //or condition in mongoose
          queryobj['$or'] = [ {_id : {$in : user.ticketsAssigned}}, {_id : { $in : ticketCreatedTemp}}];

      }
      //show the latest tickets  first for admin alone
    if(user.userType==userType.admin){
      const ticket = await Ticket.find().sort({_id : -1});
      return res.status(200).send(ticket);
        
    }else{
        const ticket = await Ticket.find(queryobj);
        return res.status(200).send(ticket);
    }     
    } 
    catch (error) {
        console.log(error.message);
        return res.status(500).send("server error");
    }
}


exports.updateTickets = async(req,res)=>{

    try {
        const ticket = await Ticket.findOne({ _id : req.params.id });
        ticket.title = req.body.title ? req.body.title : ticket.title;
        ticket.description = req.body.description ? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.ticketPriority ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status ? req.body.status : ticket.status;
        ticket.assignee = req.body.assignee?req.body.assignee : ticket.assignee;
       
        const updatedTicket  = await ticket.save();
        return res.status(200).send(updatedTicket);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("server error");
    }
}