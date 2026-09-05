const express = require('express');
const db = require('../config/database');
const { expertOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/expert/cases
router.get('/cases', expertOnly, (req, res) => {
  const cases = db.findAllCases(req.query);
  res.json({ success: true, data: cases });
});

// GET /api/expert/cases/:id
router.get('/cases/:id', expertOnly, (req, res) => {
  const caseItem = db.findCaseById(req.params.id);
  if (!caseItem) return res.status(404).json({ success: false, error: 'Case not found' });
  res.json({ success: true, data: caseItem });
});

// POST /api/expert/cases/:id/validate
router.post('/cases/:id/validate', expertOnly, (req, res) => {
  const { action, correctedDisease, severity, confidence, notes } = req.body;
  
  const caseItem = db.findCaseById(req.params.id);
  if (!caseItem) return res.status(404).json({ success: false, error: 'Case not found' });

  let newStatus = caseItem.status;
  if (action === 'CONFIRM') newStatus = 'VERIFIED';
  else if (action === 'CORRECT') newStatus = 'CORRECTED';
  else if (action === 'RETAKE') newStatus = 'RETAKE_REQUESTED';

  const expertValidation = {
    expertId: req.user?._id || 'u-expert-001',
    expertName: req.user?.name || 'Dr. Shailesh Kulkarni',
    action,
    correctedDisease: correctedDisease || null,
    severity: severity || caseItem.detection?.severity,
    confidence: confidence || 1.0,
    notes: notes || '',
    validatedAt: new Date()
  };

  const updatedCase = db.updateCase(req.params.id, {
    status: newStatus,
    expertValidation
  });

  res.json({ success: true, data: updatedCase });
});

module.exports = router;
