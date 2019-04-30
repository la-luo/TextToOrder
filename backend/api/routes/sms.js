const express = require('express');
const router = express.Router();
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'hello') {
      twiml.message('Hi!');
    } else if (req.body.Body == 'bye') {
      twiml.message('Goodbye');
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }
  
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });
  

module.exports = router;



