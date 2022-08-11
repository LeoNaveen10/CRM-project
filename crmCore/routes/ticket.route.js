const { createTicket, getTicket, updateTickets } = require("../controllers/ticketController")
const { verifyToken } = require("../middlewares/authJwt");
const { ticketReqValid, updateTicketValid } = require("../middlewares/ticketValidation");

module.exports = (app)=>{


    app.post("/crm/api/v1/ticket",[verifyToken,ticketReqValid],createTicket);
    app.get("/crm/api/v1/ticket",[verifyToken],getTicket);
    app.put('/crm/api/v1/ticket/:id',[verifyToken,updateTicketValid],updateTickets);
}