const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Store = require('../models/store');
const Rating = require('../models/rating');
const router = express.Router();

router.get('/myratings', authenticate, authorize(['owner']), async (req, res) => {
  // Assume store owner email matches store email
  const store = await Store.findOne({ where: { email: req.user.email } });
  if (!store) return res.status(404).json({ error: 'Store not found' });
  const ratings = await Rating.findAll({ where: { StoreId: store.id }, include: ['User'] });
  const avgRating = await Rating.findOne({
    where: { StoreId: store.id },
    attributes: [[sequelize.fn('AVG', sequelize.col('value')), 'avg']]
  });
  res.json({ ratings, avgRating });
});

module.exports = router;