const express = require("express");
const { google } = require('googleapis'); 
const nodemailer = require('nodemailer');
const path = require('path');
//app.use(express.static('public'));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Clinent = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET, REDIRECT_URI);
oAuth2Clinent.setCredentials({ refresh_token: REFRESH_TOKEN});

let router = express.Router();


router.route("/").get((req,res) => {
    res.sendFile(path.join(__dirname, '..', 'contact', 'contact.html'))
})

.post((req,res) =>{
async function sendMail(){
try{
 const accesToken = await oAuth2Clinent.getAccessToken;
 const transport = nodemailer.reateTransport({
     service: 'gmail',
     auth: {
         type: 'OAuth2',
         user: 'eli092011@gmail.com',
         clientId: CLIENT_ID,
         clientSecret: CLIENT_SECRET,
         refreshToken: REFRESH_TOKEN,
         accessToken: accesToken
     }
 })

 const mailOptions = {
     from: ' Eli\'s porfolio Website',
     to: 'eli092011@gmail.com',
     subject: "You have a new email from your website!",
     html: '<p>${req.body.email}</p>'
 };
 const result = await transport.sendMail(mailOptions)
 document.getElementById('result').innerHTML = "Success";
 return result
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
module.express = router;