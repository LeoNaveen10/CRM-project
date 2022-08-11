const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./config/server.config');
const mongoose = require('mongoose');
const { url } = require('./config/db.config');
const User = require('./models/user_model');
const bcrypt = require('bcrypt');
const Ticket = require('./models/ticket.model');


app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/ticket.route')(app);


mongoose.connect(url);
const db = mongoose.connection;
db.on('error', ()=>{
    console.log('error while creating to db')
})
db.once('open',()=>{
    console.log('connceted to mongodb');
    init();
})


async function init() {
    
try {
    // await User.collection.drop();
    // await Ticket.collection.drop();
    let user = await User.findOne({userId : 'admin'});

    if(user){
        console.log('user is already present')
        return;
    }
    user=  await User.create({
        name : 'naveen',
        userId : 'admin',
        password : bcrypt.hashSync('welcome1',8),
        email : 'admin@gmail.com',
        userType : 'ADMIN'
    })
    console.log('admin user created',user);
} catch (error) {
    console.log(' admin user creating error',error.message);
}
   
}


app.use('/',(req,res)=>{
    res.send('you are connected');
})
app.listen(serverConfig.PORT,()=>{
    console.log(`app started in port ${serverConfig.PORT} `);
})