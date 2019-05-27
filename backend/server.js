const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require("path");
const API_PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const logger = require('morgan');
const dbRoute = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const usersRoutes = require('./api/routes/users');
const merchantsRoutes = require('./api/routes/merchants');
const smsRoutes = require('./api/routes/sms');
const passport = require('passport');
require('./config/passport');

mongoose 
  .connect(dbRoute, { useNewUrlParser: true })
  .then(() => console.log("Connect to MongoDB successfully!"))
  .catch(err => console.log(err));

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger("dev"));

app.use(passport.initialize());

app.use('/api/users', usersRoutes);
app.use('/merchants', merchantsRoutes);
app.use('/', smsRoutes);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));