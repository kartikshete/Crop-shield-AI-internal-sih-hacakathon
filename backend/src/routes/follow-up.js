const express = require('express');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/follow-up
router.post('/', authMiddleware, (req, res) => {
  const { caseId, actionTaken, observation, severityChange, nextSteps } = req.body;
  
  if (!caseId) return res.status(400).json({ success: false, error: 'caseId is required' });

  const followUp = db.createFollowUp({
    caseId,
    farmerId: req.user?._id || 'u-farmer-001',
    actionTaken,
    observation,
    severityChange,
    nextSteps
  });

  res.status(201).json({ success: true, data: followUp });
});

// GET /api/follow-up/:caseId
router.get('/:caseId', (req, res) => {
  const followUps = db.getFollowUpsByCaseId(req.params.caseId);
  res.json({ success: true, data: followUps });
});

module.exports = router;
