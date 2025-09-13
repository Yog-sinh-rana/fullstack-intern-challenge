const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    if (!/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password) || password.length < 8 || password.length > 16)
      return res.status(400).json({ error: 'Password validation failed' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hash, role: 'user' });
    res.json({ id: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, 'SECRET_KEY');
  res.json({ token, role: user.role });
});

module.exports = router;