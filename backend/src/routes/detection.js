const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/database');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG, JPEG, PNG files are allowed'), false);
  },
});

// POST /api/detection — Full detection pipeline
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { crop, district, taluka, village, cropStage, farmerName, phone } = req.body;

    // 1. Image Quality Check (deterministic mock)
    const imageQuality = {
      passed: true,
      blurScore: 148.6 + Math.random() * 30,
      illuminationScore: 132.0 + Math.random() * 20,
      exposure: 'NORMAL',
      statusText: 'Good Resolution & Lighting',
      issues: [],
    };

    // 2. Disease Detection (deterministic mock based on crop)
    let detection;
    const cropLower = (crop || 'cotton').toLowerCase();

    if (cropLower === 'cotton') {
      detection = {
        diseaseName: 'Alternaria Leaf Spot',
        pathogenType: 'Fungal (Alternaria macrospora)',
        confidence: 0.88,
        severity: 'MODERATE',
        affectedAreaPercentage: 18,
        alternatives: [
          { diseaseName: 'Bacterial Blight (Angular Leaf Spot)', confidence: 0.08 },
          { diseaseName: 'Cercospora Leaf Spot', confidence: 0.03 },
          { diseaseName: 'Healthy Foliage', confidence: 0.01 },
        ],
        explanation: {
          symptomsObserved: [
            'Concentric circular brown necrotic rings with purple halo margins',
            'Shot-hole effect in mature lesion centers',
            'Foliage yellowing adjacent to lesion perimeters',
          ],
          affectedZone: 'Mid to lower plant canopy',
          gradCamDesc: 'Attention on necrotic circular lesion margins and chloroplast degradation rings.',
        },
      };
    } else if (cropLower === 'soybean') {
      detection = {
        diseaseName: 'Bacterial Pustule',
        pathogenType: 'Bacterial (Xanthomonas axonopodis)',
        confidence: 0.74,
        severity: 'MODERATE',
        affectedAreaPercentage: 12,
        alternatives: [
          { diseaseName: 'Bacterial Blight', confidence: 0.15 },
          { diseaseName: 'Healthy', confidence: 0.11 },
        ],
        explanation: {
          symptomsObserved: ['Raised pustules on leaf surface', 'Yellow halo around pustules'],
          affectedZone: 'Lower canopy',
          gradCamDesc: 'Model saliency on pustule structures.',
        },
      };
    } else if (cropLower === 'paddy' || cropLower === 'rice') {
      detection = {
        diseaseName: 'Rice Blast',
        pathogenType: 'Fungal (Magnaporthe oryzae)',
        confidence: 0.76,
        severity: 'MODERATE',
        affectedAreaPercentage: 15,
        alternatives: [
          { diseaseName: 'Brown Spot', confidence: 0.14 },
          { diseaseName: 'Healthy', confidence: 0.10 },
        ],
        explanation: {
          symptomsObserved: ['Diamond-shaped lesions', 'Grey centres with brown margins'],
          affectedZone: 'Upper leaves',
          gradCamDesc: 'Attention on diamond-shaped necrotic lesions.',
        },
      };
    } else {
      // Default: healthy
      detection = {
        diseaseName: 'Healthy Crop Foliage',
        pathogenType: 'None',
        confidence: 0.96,
        severity: 'MILD',
        affectedAreaPercentage: 0,
        alternatives: [{ diseaseName: 'Minor Nutrient Stress', confidence: 0.04 }],
        explanation: {
          symptomsObserved: ['Uniform dark green leaf color', 'No lesions detected'],
          affectedZone: 'None',
          gradCamDesc: 'Uniform activation — no anomalies.',
        },
      };
    }

    // 3. Risk Assessment (deterministic mock)
    const weather = db.getWeather(district || 'Akola');
    const riskScore = Math.min(100, Math.round(weather.humidity * 0.4 + weather.rainfall * 1.5 + (detection.confidence > 0.7 ? 25 : 5)));
    const riskLevel = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MODERATE' : 'LOW';

    const riskAssessment = {
      riskScore,
      riskLevel,
      cropHealthIndex: 100 - riskScore + Math.floor(Math.random() * 10),
      contributingFactors: [
        `Humidity at ${weather.humidity}%`,
        `Rainfall: ${weather.rainfall} mm`,
        `Temperature: ${weather.temp}°C`,
        `Active cases in ${district || 'Akola'} district`,
      ],
      weatherSnapshot: weather,
      forecastTimeline: Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        date: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `Day ${i + 1}`,
        riskScore: Math.min(100, riskScore + (i < 3 ? i * 4 : -(i - 3) * 6)),
        level: riskScore + (i < 3 ? i * 4 : -(i - 3) * 6) >= 70 ? 'HIGH' : 'MODERATE',
        desc: i < 3 ? 'Increasing risk trend' : 'Stabilizing trend',
      })),
    };

    // 4. Advisory (deterministic mock)
    const advisory = {
      approach: 'IPM-FIRST',
      cultural: [
        'Remove affected plant parts and dispose safely.',
        'Maintain field drainage.',
        'Avoid overhead irrigation.',
      ],
      mechanical: ['Install yellow sticky traps.', 'Set up spore monitoring traps.'],
      biological: ['Apply Trichoderma viride @ 4 g/L.', 'Apply 5% NSKE as foliar spray.'],
      chemical: {
        warranted: false,
        advisoryNote: 'Chemical intervention not warranted at current severity. Re-evaluate in 3 days.',
        contingency: 'Consult KVK agronomist if lesions expand beyond 30% canopy.',
      },
    };

    // 5. Create case in DB
    const newCase = db.createCase({
      farmerId: req.user?._id || 'u-farmer-001',
      farmerName: farmerName || 'Demo Farmer',
      phone: phone || '9876543210',
      district: district || 'Akola',
      taluka: taluka || '',
      village: village || '',
      crop: crop || 'Cotton',
      cropStage: cropStage || 'Flowering',
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '/uploads/demo_cotton_leaf.jpg',
      imageQuality,
      detection,
      riskAssessment,
      advisory,
    });

    res.status(201).json({ success: true, data: newCase });
  } catch (err) {
    next(err);
  }
});

// GET /api/detection/:id
router.get('/:id', (req, res) => {
  const caseItem = db.findCaseById(req.params.id);
  if (!caseItem) return res.status(404).json({ success: false, error: 'Case not found' });
  res.json({ success: true, data: caseItem });
});

// GET /api/detection/history
router.get('/', (req, res) => {
  const cases = db.findAllCases(req.query);
  res.json({ success: true, data: cases, total: cases.length });
});

module.exports = router;
