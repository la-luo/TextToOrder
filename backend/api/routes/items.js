const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const passport = require('passport');

router.post('/add', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log(req);
        
        const { errors, isValid } = validateItemInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newItem = new Item({
            merchant: req.merchant.id,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description
        });

        newItem
            .save()
            .then(item => res.json(item))
            .catch(err => res.json(err));
});

module.exports = router;