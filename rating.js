const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Rating = require('../models/rating');
const Store = require('../models/store');
const router = express.Router();

// Submit or modify rating
router.post('/', authenticate, authorize(['user']), async (req, res) => {
  const { storeId, value } = req.body;
  let rating = await Rating.findOne({ where: { StoreId: storeId, UserId: req.user.id } });
  if (rating) {
    rating.value = value;
    await rating.save();
  } else {
    rating = await Rating.create({ StoreId: storeId, UserId: req.user.id, value });
  }
  res.json(rating);
});

// List all stores (with user's rating)
router.get('/stores', authenticate, authorize(['user']), async (req, res) => {
  const stores = await Store.findAll({
    include: [{
      model: Rating,
      where: { UserId: req.user.id },
      required: false
    }]
  });
  res.json(stores);
});

module.exports = router;