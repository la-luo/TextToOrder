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


router.post('/signup', (req, res) => {

  Merchant.findOne({ email: req.body.email }).then(merchant => {
    console.log('hit server for merchant signup');
    if (merchant) {
      errors.name = "A merchant has already registered with that email";
      return res.status(400).json(errors);
    } else {
      res.json({
        success: true
      });
    }
  });
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
                          items: merchant.items};
          
          console.log(payload);

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

router.post('/add-item', 
    passport.authenticate('jwt', {session: false}),
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

router.get('/:merchantId/items', (req, res) => {
      Merchant.findById(req.params.merchantId)
      .then(merchant => res.json(merchant.items))
      .catch(err => res.json(err));
});


module.exports = router;
