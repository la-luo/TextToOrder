const express = require('express');
const session = require('express-session');
const router = express.Router();
const http = require('http');
const keys = require('../../config/keys');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

router.use(session({secret: keys.sessionSecretKey }));
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    // if (req.body.Body == 'hello') {
    //   twiml.message('Hi!');
    // } else if (req.body.Body == 'bye') {
    //   twiml.message('Goodbye');
    // } else {
    //   twiml.message(
    //     'No Body param match, Twilio sends this in the request to your server.'
    //   );
    // }

    twiml.message("Hi, thank you for visiting xxx. Please text us 'd' or 'p' to inform us whether it is for delivery or pickup.");
  
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });
  

module.exports = router;



