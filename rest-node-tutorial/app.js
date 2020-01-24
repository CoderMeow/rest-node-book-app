const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true } ); //this connects to our database
const app = express(); //this is the main app
const port = process.env.PORT || 3000; //the process.env.PORT is something you import file or in the app definition
const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book);
const vcap_services = JSON.parse(process.env.VCAP_SERVICES)
const serv = vcap_services["user-provided"][0];
const valToShow = serv.credentials.password;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get("/", (req, res) => {
  res.send(`Welcome to my API! ${valToShow}`);
}); //when i receive a get request I will pass a response

app.listen(port, () => {
  console.log("Running on port " + port);
});
