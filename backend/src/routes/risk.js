const express = require('express');
const db = require('../config/database');

const router = express.Router();

// POST /api/risk — Calculate risk from weather + crop + disease
router.post('/', (req, res) => {
  const { crop, district, disease, severity } = req.body;
  const weather = db.getWeather(district || 'Akola');

  const humidityFactor = Math.min(25, Math.round((weather.humidity / 100) * 25));
  const rainfallFactor = Math.min(20, Math.round(weather.rainfall * 1.2));
  const cropStageFactor = 15;
  const historyFactor = 10;
  const tempFactor = Math.min(10, Math.round(Math.abs(weather.temp - 28) < 5 ? 10 : 5));
  const riskScore = Math.min(100, humidityFactor + rainfallFactor + cropStageFactor + historyFactor + tempFactor);
  const riskLevel = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MODERATE' : 'LOW';

  res.json({
    success: true,
    data: {
      riskScore,
      riskLevel,
      factors: [
        { name: 'Humidity', value: humidityFactor, max: 25 },
        { name: 'Rainfall', value: rainfallFactor, max: 20 },
        { name: 'Crop Stage', value: cropStageFactor, max: 15 },
        { name: 'Local History', value: historyFactor, max: 10 },
        { name: 'Temperature', value: tempFactor, max: 10 },
      ],
      explanation: `${riskLevel} risk due to ${weather.humidity}% humidity, ${weather.rainfall}mm rainfall, and regional disease pressure.`,
    },
  });
});

// GET /api/risk/forecast
router.get('/forecast', (req, res) => {
  const district = req.query.district || 'Akola';
  const weather = db.getWeather(district);
  const baseRisk = Math.min(100, Math.round(weather.humidity * 0.4 + weather.rainfall * 1.5 + 15));

  const forecast = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    date: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `Day ${i + 1}`,
    riskScore: Math.min(100, Math.max(10, baseRisk + (i < 3 ? i * 5 : -(i - 3) * 7))),
    level: baseRisk + (i < 3 ? i * 5 : 0) >= 70 ? 'HIGH' : 'MODERATE',
    desc: i < 3 ? 'Risk increasing due to sustained moisture' : 'Risk stabilizing as conditions improve',
  }));

  res.json({
    success: true,
    data: {
      district,
      forecast,
      warning: baseRisk >= 70
        ? `Risk expected to remain HIGH for approximately ${3} days.`
        : 'Risk is at moderate levels. Continue monitoring.',
    },
  });
});

// GET /api/risk/:id
router.get('/:id', (req, res) => {
  const caseItem = db.findCaseById(req.params.id);
  if (!caseItem) return res.status(404).json({ success: false, error: 'Case not found' });
  res.json({ success: true, data: caseItem.riskAssessment });
});

module.exports = router;
