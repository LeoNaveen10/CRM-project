const { findAll, findByUserId, update } = require("../controllers/userControllers");
const { verifyToken, isAdmin, isvalidUserIdInReqParams, isAdminOrCustomer } = require("../middlewares/authJwt");


module.exports = (app)=>{

    //this supports usertype  and userstatus  in query params also
    app.get("/crm/api/v1/users",[verifyToken,isAdmin],findAll);

    //this  supports own customer or the admin can get user based on userId
    app.get("/crm/api/v1/users/:id",[verifyToken,isvalidUserIdInReqParams,isAdminOrCustomer],findByUserId);

    //this  supports own customer or the admin can update user based on userId
    app.put("/crm/api/v1/users/:id",[verifyToken,isvalidUserIdInReqParams,isAdminOrCustomer],update);

}