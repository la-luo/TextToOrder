const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Merchant = require('../models/Merchant');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Item = require('../models/Item').Item;
const validateItemInput = require('../../validation/items');
require("../../config/passport")(passport);
const sendmail = require('sendmail')();
const cryptoRandomString = require('crypto-random-string');


router.post('/signup', async (req, res) => {

  Merchant.findOne({ email: req.body.email }).then(merchant => {
    console.log('hit server for merchant signup: ', req.body);
    if (merchant) {
      errors.name = "A merchant has already registered with that email";
      return res.status(400).json(errors);
    } else {
      const pin = cryptoRandomString({length: 12, type: 'base64'});
      console.log('pin: ', pin);
      newMerchant = new Merchant({
        email: req.body.email,
        storename: req.body.storename,
        address: req.body.storeaddress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        active: false,
        pin: pin
      });

      newMerchant.save( err => {
        if(err) {
          console.log(err);
        }
      });

      const emailLink = `https://text-to-order.herokuapp.com/merchants/activate/${pin}`

      sendmail({
        from: 'no-reply@text-to-order.com',
        to: req.body.email,
        subject: `Verify ${req.body.email} is your email address`,
        html: `Confirm email address: ${emailLink}`
      }, function(err, reply) {
        console.log(err && err.stack);
        // console.dir(reply);
        res.json({
          success: true
        });
      })

    }
  });
});

router.post('/activate/:pin', async (req, res) => { 
    Merchant.findOne({ pin: req.params.pin})
    .then(merchant => {
      merchant.active = true;
      merchant.save( err => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send('You have verified your email. We will contact you soon!');
        }
      })
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/login', (req, res) => {

  const password = req.body.password;

  Merchant.findOne({ email: req.body.email })
    .then(merchant => {
      if (!merchant) {
        errors.email = "This merchant does not exist"
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, merchant.password)
        .then(isMatch => {
         if (isMatch) {
          const payload = {id: merchant.id,
                          email: merchant.email,
                          phone: merchant.phone,
                          firstname: merchant.firstname,
                          lastname: merchant.lastname,
                          storename: merchant.storename,
                          address: merchant.address,
                          intro: merchant.intro,
                          items: merchant.items,
                          orders: merchant.orders};

          // using jwt per the docs
          jwt.sign(
            payload,
            keys.secretOrPrivateKey,
            // tells the key to expire in one hour

            {expiresIn: 3600},
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
            });
          });
      } else {
        errors.password = "Incorrect password"
        return res.status(403).json(errors)
      }
    });
  });
});


router.post('/add-item', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        
        const { errors, isValid } = validateItemInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newItem = new Item({
            merchant: req.body.merchant,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description
        });

        let merchant = await Merchant.findOne({
          _id: req.body.merchant
        });

        merchant.items.push(newItem);
        merchant = await merchant.save();
        newItem
            .save()
            .then(item => res.json(item))
            .catch(err => res.json(err));
});

router.get('/:merchantId/items',
  async (req, res) => {
    console.log('Get items from backend');
      Merchant.findById(req.params.merchantId)
      .then(merchant => res.json(merchant.items))
      .catch(err => res.json(err));
});

router.get('/basic/:merchantId',
  async (req, res) => {
  console.log('merchant id', req.params.merchantId);
  Merchant.findById(req.params.merchantId)
  .then(merchant => {
    const payload = {
      id: merchant.id,
      storename: merchant.storename,
      phone: merchant.phone,
      address: merchant.address,
      intro: merchant.intro
    }
    console.log('Merchant basic info:', payload);
    return res.status(200).json(payload);
  })
  .catch(err => res.json(err));
});


router.put('/edit-item/:itemId', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
  //should be optimized
  Item.findByIdAndUpdate(req.params.itemId, {$set: req.body}, {new: true}, function(err, newItem){
    if(err) {
      res.json(err);
    } else {
      console.log('update item in item list!');
      Merchant.findOneAndUpdate({'items._id': req.params.itemId}, {$set: {'items.$': req.body}}, {new: true}, function(err, newMer){
        if(err) {
          res.json(err);
        } else {
          console.log('update item in merchant!');
          res.json(newMer.items);
        }
      })
    }
  })
});

router.delete('/delete-item/:itemId', passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    //should be optimized
  Item.findOneAndRemove({_id: req.params.itemId}, function(err, doc){
    if (err) {
      res.json(err);
    } else {
      console.log('delete from item list');
      Merchant.findOneAndUpdate({_id: doc.merchant}, {$pull: {'items': {_id: doc.id}}}, {new: true}, function(err, newMerchant){
        if (err) {
          res.json(err);
        } else {
          console.log('Item completely deleted!');
          res.json(newMerchant.items);
        }
      });
    }
  });
 
});


module.exports = router;
