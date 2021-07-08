const express = require('express');
const path = require('path');
const contact = require('./routes/contact');
const academic = require("./routes/academics");
const technical = require("./routes/tech");

const app = express();
const PORT = process.env.PORT || 8080;
//const router = require(".routes");

//var http = require('http');
//var server = http.Server(app);
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/contact", contact);
app.use("/academics", academic);
app.use("/technical", technical);
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/main/index.html'));
});

app.listen(PORT, () => {
    console.log('App is live at ' + PORT);
});