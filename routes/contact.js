const express = require("express");
const { google } = require('googleapis'); 
const nodemailer = require('nodemailer');
const path = require('path');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_CLIENT = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET, REDIRECT_URI);

GMAIL_CLIENT.setCredentials({ refresh_token: REFRESH_TOKEN});

let router = express.Router();

router.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname, '..','contact','index.html'));
})
.post((req,res) =>{
async function sendMail(){
try{
 const ACCESS_TOKEN= await GMAIL_CLIENT.getAccessToken();
 const transport = nodemailer.createTransport({
     service: 'gmail',
     auth: {
         type: 'OAuth2',
         user: 'eli092011@gmail.com',
         clientId: CLIENT_ID,
         clientSecret: CLIENT_SECRET,
         refreshToken: REFRESH_TOKEN,
         accessToken: ACCESS_TOKEN
     }
 });

 const mailOptions = {
     from: ' Eli\'s porfolio Website',
     to: 'eli092011@gmail.com',
     subject: "You have a new email from your website!",
     text: ``,
     html: `<h4> Email: ${req.body.email} </h4>
            <h4> Name: ${req.body.name} </h4>
            <p> Message <br> ${req.body.message}`
 }

 const result = await transport.sendMail(mailOptions);
 return result;
}
catch(error){
    return error;
}
}

sendMail().then((result) => {
    console.log(result);
    res.sendStatus(200);
})
.catch(error => console.log(error.mmessage));
});

module.exports = router;