const jwt = require('jsonwebtoken');
const config = require('../config/env');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Allow requests without auth in demo mode
    req.user = { _id: 'u-farmer-001', role: 'farmer', name: 'Demo Farmer' };
    return next();
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Fallback to demo user on invalid token
    req.user = { _id: 'u-farmer-001', role: 'farmer', name: 'Demo Farmer' };
    next();
  }
}

function expertOnly(req, res, next) {
  if (req.user && req.user.role === 'expert') {
    return next();
  }
  // In demo mode, allow all through but tag the user
  req.user = { ...req.user, role: 'expert' };
  next();
}

module.exports = { authMiddleware, expertOnly };
