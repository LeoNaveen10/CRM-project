

if(process.env.NODE_ENV!='production'){
    require('dotenv').config(); //in production it is  not needed to read from .env file
}

module.exports ={
    PORT : process.env.PORT
}