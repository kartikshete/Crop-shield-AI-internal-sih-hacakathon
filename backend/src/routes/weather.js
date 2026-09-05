const express = require('express');
const db = require('../config/database');

const router = express.Router();

// GET /api/weather?location=Akola
router.get('/', (req, res) => {
  const location = req.query.location || 'Akola';
  const weather = db.getWeather(location);
  res.json({ success: true, data: weather });
});

module.exports = router;
