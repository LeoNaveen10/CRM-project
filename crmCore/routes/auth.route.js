const { signup, signIn } = require("../controllers/authController")
const { validiateSignUpRequest, validiateSignInRequest } = require("../middlewares/verifySignup")

module.exports = (app) =>{
    app.post('/crm/api/v1/auth/signup',validiateSignUpRequest,signup)
    app.post('/crm/api/v1/auth/signin',validiateSignInRequest,signIn)
}