const express = require('express');
const router = express.Router();

router.post('/checkout', (req, res) => {

    console.log('Checkout API receives card token and will charge it with a payment gateway.');
    res.json({
        success: true
    });
  });