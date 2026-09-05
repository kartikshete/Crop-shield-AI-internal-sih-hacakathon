const express = require('express');
const db = require('../config/database');

const router = express.Router();

// GET /api/alerts
router.get('/', (req, res) => {
  const alerts = db.findAllAlerts();
  res.json({ success: true, data: alerts });
});

// POST /api/alerts/:id/read
router.post('/:id/read', (req, res) => {
  const alert = db.markAlertRead(req.params.id);
  if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
  res.json({ success: true, data: alert });
});

module.exports = router;
