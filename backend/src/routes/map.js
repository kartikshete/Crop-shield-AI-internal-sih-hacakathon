const express = require('express');

const router = express.Router();

// Use the mock data we fetched
const mockDistricts = [
  {
    id: "akola",
    name: "Akola",
    coordinates: [20.7002, 77.0082],
    dominantCrop: "Cotton",
    riskLevel: "HIGH",
    riskScore: 84,
    activeCases: 23,
    trend: "RISING",
    dominantThreat: "Alternaria Leaf Spot",
    threatType: "Fungal",
    recommendedResponse: "Deploy IPM field sanitation and yellow sticky traps.",
    hotspotsCount: 4,
    weather: { temp: 31, humidity: 86, rainfall: 14.2 },
    hotspots: [
      { lat: 20.715, lng: 77.025, cases: 9, threat: "Alternaria Leaf Spot", severity: "HIGH", village: "Murtizapur Road Cluster" },
    ]
  },
  {
    id: "buldhana",
    name: "Buldhana",
    coordinates: [20.5293, 76.1843],
    dominantCrop: "Cotton",
    riskLevel: "HIGH",
    riskScore: 79,
    activeCases: 17,
    trend: "RISING",
    dominantThreat: "Bacterial Blight",
    threatType: "Bacterial",
    recommendedResponse: "Inspect lower foliage.",
    hotspotsCount: 3,
    weather: { temp: 30, humidity: 82, rainfall: 9.8 },
    hotspots: []
  },
  {
    id: "amravati",
    name: "Amravati",
    coordinates: [20.9374, 77.7796],
    dominantCrop: "Soybean",
    riskLevel: "MODERATE",
    riskScore: 62,
    activeCases: 12,
    trend: "STABLE",
    dominantThreat: "Yellow Mosaic Virus",
    threatType: "Viral",
    recommendedResponse: "Vector control required.",
    hotspotsCount: 2,
    weather: { temp: 29, humidity: 78, rainfall: 4.5 },
    hotspots: []
  }
];

// GET /api/map/districts
router.get('/districts', (req, res) => {
  res.json({ success: true, data: mockDistricts });
});

module.exports = router;
