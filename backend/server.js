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
require('./config/passport');

mongoose 
  .connect(dbRoute)
  .then(() => console.log("Connect to MongoDB successfully!"))
  .catch(err => console.log(err));

var app = express();
usersRoutes(app)

app.use(cors());
const router = express.Router();

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

// this is our get method
// this method fetches all available data in our database
router.get("/getMessage", (req, res) => {
  Message.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


// this is our delete method
// this method removes existing data in our database
router.delete("/deleteMessage", (req, res) => {
  const { id } = req.body;
  Message.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putMessage", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));