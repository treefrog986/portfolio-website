var PORT = 3002;
const express = require('express');
const app = express();

require('dotenv').config();

console.log(process.env);
var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function(){
    console.log("running");
});