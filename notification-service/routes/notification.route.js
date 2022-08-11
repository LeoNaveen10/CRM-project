const { acceptNotificationRequest, getNotificationDetails } = require("../controllers/notification.controller");


module.exports = (app) => {

    
     app.post("/notiserv/api/v1/notifications", acceptNotificationRequest);
  
  
     
     app.get("/notiserv/api/v1/notifications/:id", getNotificationDetails);
     
  
  }