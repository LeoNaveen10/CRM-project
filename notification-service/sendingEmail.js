/**
 * sending email model file /////// sample file is this  one ////
 * 
 * SMTP - simple mail transfer protocol(same like http or https)
 */

const nodemailer = require('nodemailer');

transporter = nodemailer.createTransport({
    port : 465,
    host : "smtp.gmail.com",
    auth : {
        user : 'naveensundar313@gmail.com',
        pass : 'agnvajmvuymnsfyi'
    },
    secure: true
})

// console.log(transporter);


/**
 * sending email
 */

const mailDataObj = {
    from : 'crm-no-reply@gmail.com',
    to : 's.shreeja.s@gmail.com',
    subject :   'testing to send email',
    text : 'hope this  gets delivered'
}

transporter.sendMail(mailDataObj,(err,date)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log('email sent successfully');
    }
})