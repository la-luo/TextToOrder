const express = require('express');
const router = express.Router();
const Order = require('../models/Order').Order;

router.get('/:orderId',
  async (req, res) => {
  console.log('Hit order API to get order data.');
  Order.findById(req.params.orderId)
  .then(order => {
    console.log('Fetched order: ', order);
    return res.status(200).json(order);
  })
  .catch(err => res.json(err));
});

module.exports = router;