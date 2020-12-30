const express = require('express');
const session = require('express-session');
const router = express.Router();
const http = require('http');
const keys = require('../../config/keys');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const Merchant = require('../models/Merchant');

router.use(session({secret: keys.sessionSecretKey }));
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sms/:phoneNumber', (req, res) => {

    const twiml = new MessagingResponse();
    Merchant.findOne({ phone: req.params.phoneNumber }).then(merchant => {
      
      if (merchant) {
        twiml.message(`Hi, thank you for visiting ${merchant.storename}. Here is the menu http://a4d0d5751075.ngrok.io/merchants/${merchant.id}`);
  
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());

      } else {
        twiml.message('Merchant Not Found');
  
        res.writeHead(500, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
      }
    })

  });
  

module.exports = router;



