const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
require("../../config/passport")(passport);


router.post('/signup', (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.name = "A user has already registered with that email";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = {id: user.id, username: user.username};

              jwt.sign(payload, keys.secretOrPrivateKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Login Users

router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;


  User.findOne({username})
    .then(user => {
      if (!user) {
        errors.username = "This user does not exist"
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
         if (isMatch) {
          const payload = {id: user.id, 
                           username: user.username,
                          };

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



module.exports = router;