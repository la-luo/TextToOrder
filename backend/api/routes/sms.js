const express = require('express');
const session = require('express-session');
const router = express.Router();
const http = require('http');
const keys = require('../../config/keys');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const Merchant = require('../models/Merchant');
const Order = require('../models/Order').Order;
const Item = require('../models/Item').Item;

router.use(session({secret: keys.sessionSecretKey }));
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/sms/:phoneNumber', (req, res) => {

    const twiml = new MessagingResponse();
    Merchant.findOne({ phone: req.params.phoneNumber }).then(merchant => {
      
      if (merchant) {
        if (req.session.cart !== undefined) {
          console.log('Session Status:', req.session);
          var cart = req.session.cart?req.session.cart.split(','):[];
          var total = parseFloat(req.session.total);
          if (req.body.Body.includes('Add')) {
            var itemName = req.body.Body.match(/\'(.*?)\'/)[1];
            console.log('Captured item name:', itemName);
            Item.findOne({name: itemName, merchant: merchant.id})
            .then(item => {
              total += parseFloat(item.price);
              total = total.toFixed(2);
              cart.push(itemName);
              req.session.cart = cart.join(',');
              req.session.total = total;
              twiml.message(`Items you have in cart: ${req.session.cart} \n Total: ${total}`);
              res.writeHead(200, { 'Content-Type': 'text/xml' });
              res.end(twiml.toString());
            })
            .catch(err => console.log(err));
          } else if (req.body.Body.includes('Remove')) {
            var itemName = req.body.Body.match(/\'(.*?)\'/)[1];
            console.log('Captured item name:', itemName);
            Item.findOne({name: itemName, merchant: merchant.id})
            .then(item => {
              const idx = cart.indexOf(itemName);
              if (idx > -1) {
                total -= parseFloat(item.price);
                total = total.toFixed(2);
                req.session.total = total;
                cart.splice(idx, 1);
                req.session.cart = cart.join(',');
                twiml.message(`Items you have in cart: ${req.session.cart} \n Total: ${total}`);
              } else {
                twiml.message(`There is no ${itemName} in your cart.`);
              }
              res.writeHead(200, { 'Content-Type': 'text/xml' });
              res.end(twiml.toString());
            })
          } else if (req.body.Body.match(/Place|place/g)) {
            // create order 
              const newOrder = new Order({
                  items: cart,
                  merchant: merchant.id,
                  total: total
              });
      
              merchant.orders.push(newOrder);
              merchant.save();
              newOrder
                  .save()
                  .then(order => {
                    twiml.message(`Please pay via the link: https://text-to-order.herokuapp.com/checkout/${order.id}`);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                  })
                  .catch(err => console.log(err));
          } else {
            twiml.message('Invalid message. Please try again.');
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
          }
        } else {
          twiml.message(`Hi, thank you for visiting ${merchant.storename}. Here is the menu: https://text-to-order.herokuapp.com/merchants/${merchant.id}. Please click buttons on menu to add/remove items and place order.`);
          req.session.cart = '';
          req.session.total = 0;
          res.writeHead(200, { 'Content-Type': 'text/xml' });
          res.end(twiml.toString());
        }
      } else {
        twiml.message('Merchant Not Found');
        res.writeHead(500, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
      }

    })
  });
  

module.exports = router;
