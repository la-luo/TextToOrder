const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const API_PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const logger = require('morgan');
const dbRoute = require("./config/keys").mongoURI;
var cors = require('cors');
const mongoose = require("mongoose");
const User = require('./api/models/userModel');
const Message = require("./api/models/messageModel");
const indexRoutes = require('./api/routes/index');
const usersRoutes = require('./api/routes/usersRoutes');
const passport = require('passport');
require('./config/passport');

mongoose 
  .connect(dbRoute)
  .then(() => console.log("Connect to MongoDB successfully!"))
  .catch(err => console.log(err));

var app = express();
usersRoutes(app)

app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// append /api for our http requests
app.use("/api", router);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));