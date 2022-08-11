const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { url } = require('./configs/db.config');
const db = require("./models/notification.model");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

require('./routes/notification.route')(app);

//cron  file below
require('./scheduler/emailScheduler');

mongoose.connect(url);
db.on('error', ()=>{
    console.log('error while creating to db')
})
db.once('open',()=>{
    console.log('connceted to mongodb');
})


app.listen('8000',()=>{
    console.log('server started on 8000');
})
