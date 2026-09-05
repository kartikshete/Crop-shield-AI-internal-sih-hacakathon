const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const db = require('../config/database');

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Demo mode: accept any credentials or default demo user
  const user = db.findUserByEmail(email) || db.findUserByEmail('farmer@cropshield.demo');

  const token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role, email: user.email },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  res.json({
    success: true,
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, district: user.district },
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, role, district, phone } = req.body;
  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ success: false, error: 'User already exists' });
  }
  const user = db.createUser({ name, email, password, role: role || 'farmer', district, phone });
  const token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role, email: user.email },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
  res.status(201).json({ success: true, token, user });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  // Demo fallback
  const user = db.findUserById(req.user?._id) || db.findUserByEmail('farmer@cropshield.demo');
  res.json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, district: user.district },
  });
});

module.exports = router;
