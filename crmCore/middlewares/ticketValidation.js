const User = require("../models/user_model");
const Ticket = require("../models/ticket.model");
const { userType } = require("../utils/constant");

exports.ticketReqValid = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({
      success: false,
      message: "ticket title must be present",
    });
  }
  if (!req.body.description) {
    return res.status(400).send({
      success: false,
      message: "ticket description must be present",
    });
  }
  next();
};

exports.updateTicketValid = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const user = await User.findOne({ userId: req.userId });

    if(req.body.assignee && user.userType != userType.admin){
        return res.status(401).send({
            message: "only ADMIN can change the assignee",
          });
    }else {//check if the passed assignee id is valid or not
       let engineer = await User.findOne({userId : req.body.assignee});
       if(engineer.length==0 || engineer.userType !=userType.engineer){
        return res.status(403).send({
            message: "Entered new Assignee is not a valid one",
          });
       }
    }


    if (user.userType == userType.admin) {
      next();
    } 
    else if (
      user.userType == userType.customer &&
      user.ticketsCreated.includes(ticketId) //includes to check the ticket present or not
    ) {
      next();
    }
     else if (
      user.userType == userType.engineer &&
      (user.ticketsCreated.includes(ticketId) ||
        user.ticketsAssigned.includes(ticketId))
    ) {
      next();
    } 
    else {
      return res.status(401).send({
        message: "only ADMIN | Engineer | ticket creator can update the tickets",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "server error",
    });
  }
};
