const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/user');
const Store = require('../models/store');
const Rating = require('../models/rating');
const router = express.Router();

// Add store
router.post('/store', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, address } = req.body;
  const store = await Store.create({ name, email, address });
  res.json(store);
});

// Add user
router.post('/user', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, address, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, address, password: hash, role });
  res.json(user);
});

// Dashboard stats
router.get('/dashboard', authenticate, authorize(['admin']), async (req, res) => {
  const usersCount = await User.count();
  const storesCount = await Store.count();
  const ratingsCount = await Rating.count();
  res.json({ usersCount, storesCount, ratingsCount });
});

// List stores/users with filters
router.get('/stores', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, address } = req.query;
  const stores = await Store.findAll({
    where: { ...(name && { name }), ...(email && { email }), ...(address && { address }) },
    include: [Rating]
  });
  res.json(stores);
});

router.get('/users', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, address, role } = req.query;
  const users = await User.findAll({
    where: { ...(name && { name }), ...(email && { email }), ...(address && { address }), ...(role && { role }) }
  });
  res.json(users);
});

module.exports = router;