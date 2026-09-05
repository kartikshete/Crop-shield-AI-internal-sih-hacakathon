const { v4: uuidv4 } = require('uuid');

// ── In-Memory Data Store ──
// This replaces MongoDB when USE_MOCK_DB=true or MongoDB is unavailable.
// It is pre-seeded with deterministic demo data matching the frontend mockCases.

const users = [
  {
    _id: 'u-farmer-001',
    name: 'Ramesh Patil',
    email: 'farmer@cropshield.demo',
    password: '$2b$10$dummyHashedPasswordForDemo1234567890abcdef', // "demo123"
    role: 'farmer',
    district: 'Akola',
    phone: '9876543210',
    createdAt: new Date('2026-01-01'),
  },
  {
    _id: 'u-expert-001',
    name: 'Dr. Shailesh Kulkarni',
    email: 'expert@cropshield.demo',
    password: '$2b$10$dummyHashedPasswordForDemo1234567890abcdef', // "demo123"
    role: 'expert',
    district: 'Akola',
    phone: '9800012345',
    createdAt: new Date('2026-01-01'),
  },
];

const cases = [
  {
    _id: 'CS-2026-1023',
    farmerId: 'u-farmer-001',
    farmerName: 'Ramesh Patil',
    phone: '9876543210',
    district: 'Akola',
    taluka: 'Barshitakli',
    village: 'Rustampur',
    crop: 'Cotton',
    cropStage: 'Flowering & Boll Formation',
    status: 'PENDING_REVIEW',
    imageUrl: '/uploads/demo_cotton_leaf.jpg',
    imageQuality: {
      passed: true,
      blurScore: 148.6,
      illuminationScore: 132.0,
      exposure: 'NORMAL',
      statusText: 'Good Resolution & Lighting',
      issues: [],
    },
    detection: {
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
          'Concentric circular brown necrotic rings with purple halo margins on mid-canopy leaves',
          'Shot-hole effect beginning to emerge in mature lesion centers',
          'Foliage yellowing adjacent to lesion perimeters',
        ],
        affectedZone: 'Mid to lower plant canopy',
        gradCamDesc: 'Attention concentrated on necrotic circular lesion margins and chloroplast degradation rings.',
      },
    },
    riskAssessment: {
      riskScore: 82,
      riskLevel: 'HIGH',
      cropHealthIndex: 64,
      contributingFactors: [
        'Sustained relative humidity > 85% for 48 consecutive hours',
        'Recent precipitation event (14.2 mm) creating leaf moisture film',
        '23 active verified Alternaria cases in Akola district cluster',
      ],
      weatherSnapshot: { temp: 31.2, humidity: 86, rainfall: 14.2, windSpeed: 8.5, condition: 'Overcast & Humid' },
      forecastTimeline: [
        { day: 1, date: 'Today', riskScore: 82, level: 'HIGH', desc: 'Optimal sporulation moisture' },
        { day: 2, date: 'Tomorrow', riskScore: 85, level: 'HIGH', desc: 'Warm humid winds expanding spore cloud' },
        { day: 3, date: 'Day 3', riskScore: 88, level: 'HIGH', desc: 'Peak secondary infection window' },
        { day: 4, date: 'Day 4', riskScore: 78, level: 'HIGH', desc: 'Rain reduces, morning dew persists' },
        { day: 5, date: 'Day 5', riskScore: 66, level: 'MODERATE', desc: 'Sunlight begins drying canopy' },
        { day: 6, date: 'Day 6', riskScore: 54, level: 'MODERATE', desc: 'Moderate spore activity' },
        { day: 7, date: 'Day 7', riskScore: 42, level: 'MODERATE', desc: 'Stabilizing trend' },
      ],
    },
    advisory: {
      approach: 'IPM-FIRST',
      cultural: [
        'Clip and safely bury or burn lower senescent leaves showing severe necrotic rings.',
        'Ensure unimpeded field drainage to prevent root moisture stagnation.',
        'Avoid overhead sprinkler irrigation; irrigate strictly at soil root base.',
      ],
      mechanical: [
        'Erect 8-10 yellow sticky cards per acre to trap sucking vector pests.',
        'Install 2 spore monitoring traps at upwind field borders.',
      ],
      biological: [
        'Foliar spray of Trichoderma viride @ 4 g/litre during early morning or late evening.',
        'Apply 5% Neem Seed Kernel Extract (NSKE) to deter secondary opportunistic infestation.',
      ],
      chemical: {
        warranted: false,
        advisoryNote: 'Chemical fungicide NOT warranted at current moderate threshold. Re-evaluate in 3 days.',
        contingency: 'If lesions expand to > 30% canopy within 72 hours, consult KVK agronomist for Mancozeb 75% WP @ 2.5 g/L.',
      },
    },
    expertValidation: null,
    followUps: [],
    createdAt: new Date('2026-09-05T09:30:00Z'),
    updatedAt: new Date('2026-09-05T09:30:00Z'),
  },
  {
    _id: 'CS-2026-1028',
    farmerId: 'u-farmer-001',
    farmerName: 'Suresh Gaikwad',
    phone: '9823456789',
    district: 'Washim',
    taluka: 'Malegaon',
    village: 'Karanja',
    crop: 'Soybean',
    cropStage: 'Vegetative',
    status: 'PENDING_REVIEW',
    imageUrl: '/uploads/demo_soybean_leaf.jpg',
    imageQuality: { passed: true, blurScore: 162.1, illuminationScore: 145.0, exposure: 'NORMAL', statusText: 'Passed', issues: [] },
    detection: {
      diseaseName: 'Bacterial Pustule',
      pathogenType: 'Bacterial (Xanthomonas axonopodis pv. glycines)',
      confidence: 0.61,
      severity: 'MODERATE',
      affectedAreaPercentage: 12,
      alternatives: [
        { diseaseName: 'Bacterial Blight', confidence: 0.22 },
        { diseaseName: 'Cercospora Leaf Spot', confidence: 0.10 },
        { diseaseName: 'Healthy', confidence: 0.07 },
      ],
      explanation: {
        symptomsObserved: ['Small raised pustules on lower leaf surface', 'Yellow halo around pustules', 'Defoliation in lower canopy'],
        affectedZone: 'Lower canopy',
        gradCamDesc: 'Saliency highlights pustule structures on abaxial surface.',
      },
    },
    riskAssessment: {
      riskScore: 72,
      riskLevel: 'HIGH',
      cropHealthIndex: 58,
      contributingFactors: ['Warm humid conditions favour bacterial growth', '8 active cases in Washim district'],
      weatherSnapshot: { temp: 30, humidity: 82, rainfall: 8.0, windSpeed: 6.0, condition: 'Cloudy' },
      forecastTimeline: [
        { day: 1, date: 'Today', riskScore: 72, level: 'HIGH', desc: 'Active bacterial spread' },
        { day: 2, date: 'Tomorrow', riskScore: 75, level: 'HIGH', desc: 'Rain expected' },
        { day: 3, date: 'Day 3', riskScore: 70, level: 'HIGH', desc: 'Humidity persists' },
        { day: 4, date: 'Day 4', riskScore: 62, level: 'MODERATE', desc: 'Clearing trend' },
        { day: 5, date: 'Day 5', riskScore: 55, level: 'MODERATE', desc: 'Sun exposure' },
        { day: 6, date: 'Day 6', riskScore: 48, level: 'MODERATE', desc: 'Stabilizing' },
        { day: 7, date: 'Day 7', riskScore: 42, level: 'MODERATE', desc: 'Under control' },
      ],
    },
    advisory: {
      approach: 'IPM-FIRST',
      cultural: ['Remove severely affected leaves.', 'Avoid working in wet fields to prevent spread.'],
      mechanical: ['Install yellow sticky traps.'],
      biological: ['Apply Pseudomonas fluorescens @ 5 g/L.'],
      chemical: { warranted: false, advisoryNote: 'Chemical not warranted at moderate level.' },
    },
    expertValidation: null,
    followUps: [],
    createdAt: new Date('2026-09-05T10:00:00Z'),
    updatedAt: new Date('2026-09-05T10:00:00Z'),
  },
  {
    _id: 'CS-2026-1031',
    farmerId: 'u-farmer-001',
    farmerName: 'Manoj Bhosle',
    phone: '9870011223',
    district: 'Bhandara',
    taluka: 'Tumsar',
    village: 'Mohadi',
    crop: 'Paddy',
    cropStage: 'Tillering',
    status: 'PENDING_REVIEW',
    imageUrl: '/uploads/demo_paddy_leaf.jpg',
    imageQuality: { passed: true, blurScore: 155.0, illuminationScore: 138.0, exposure: 'NORMAL', statusText: 'Passed', issues: [] },
    detection: {
      diseaseName: 'Rice Blast',
      pathogenType: 'Fungal (Magnaporthe oryzae)',
      confidence: 0.76,
      severity: 'MODERATE',
      affectedAreaPercentage: 15,
      alternatives: [
        { diseaseName: 'Brown Spot', confidence: 0.14 },
        { diseaseName: 'Sheath Blight', confidence: 0.06 },
        { diseaseName: 'Healthy', confidence: 0.04 },
      ],
      explanation: {
        symptomsObserved: ['Diamond-shaped lesions on leaves', 'Grey centres with brown margins', 'Lesions coalescing along mid-rib'],
        affectedZone: 'Upper leaves',
        gradCamDesc: 'Model attention focused on diamond-shaped necrotic lesions.',
      },
    },
    riskAssessment: {
      riskScore: 68,
      riskLevel: 'MODERATE',
      cropHealthIndex: 62,
      contributingFactors: ['High humidity and warm nights', '5 active blast cases in Bhandara'],
      weatherSnapshot: { temp: 29, humidity: 88, rainfall: 15.0, windSpeed: 5.0, condition: 'Humid & Overcast' },
      forecastTimeline: [
        { day: 1, date: 'Today', riskScore: 68, level: 'MODERATE', desc: 'Blast-friendly conditions' },
        { day: 2, date: 'Tomorrow', riskScore: 72, level: 'HIGH', desc: 'Overnight dew increases risk' },
        { day: 3, date: 'Day 3', riskScore: 75, level: 'HIGH', desc: 'Peak infection window' },
        { day: 4, date: 'Day 4', riskScore: 70, level: 'HIGH', desc: 'Rain continues' },
        { day: 5, date: 'Day 5', riskScore: 60, level: 'MODERATE', desc: 'Clearing' },
        { day: 6, date: 'Day 6', riskScore: 52, level: 'MODERATE', desc: 'Drying trend' },
        { day: 7, date: 'Day 7', riskScore: 45, level: 'MODERATE', desc: 'Stabilizing' },
      ],
    },
    advisory: {
      approach: 'IPM-FIRST',
      cultural: ['Maintain optimum water depth.', 'Avoid excess nitrogen.'],
      mechanical: [],
      biological: ['Apply Trichoderma harzianum @ 4 g/L.'],
      chemical: { warranted: false, advisoryNote: 'Monitor for 48h before considering fungicide.' },
    },
    expertValidation: null,
    followUps: [],
    createdAt: new Date('2026-09-05T11:00:00Z'),
    updatedAt: new Date('2026-09-05T11:00:00Z'),
  },
];

const alerts = [
  {
    _id: 'alert-001',
    district: 'Akola',
    riskLevel: 'HIGH',
    message: 'Alternaria Leaf Spot outbreak detected in Akola cotton belt. 23 active cases.',
    nearbyCases: 23,
    expectedRiskDays: '3-5',
    recommendations: ['Inspect lower leaves', 'Monitor spread', 'Upload a photo if symptoms appear'],
    isRead: false,
    createdAt: new Date('2026-09-05T08:00:00Z'),
  },
  {
    _id: 'alert-002',
    district: 'Nashik',
    riskLevel: 'HIGH',
    message: 'Tomato Late Blight outbreak in Nashik. Immediate action required.',
    nearbyCases: 28,
    expectedRiskDays: '1-3',
    recommendations: ['Remove water-soaked foliage', 'Stake vines for air circulation', 'Stop overhead irrigation'],
    isRead: false,
    createdAt: new Date('2026-09-05T07:00:00Z'),
  },
  {
    _id: 'alert-003',
    district: 'Yavatmal',
    riskLevel: 'HIGH',
    message: 'Pink Bollworm activity rising in Yavatmal cotton fields.',
    nearbyCases: 19,
    expectedRiskDays: '3-7',
    recommendations: ['Install pheromone traps', 'Report ETL breaches to KVK'],
    isRead: false,
    createdAt: new Date('2026-09-05T06:00:00Z'),
  },
];

const weatherRecords = {
  Akola: { location: 'Akola', temp: 31.2, humidity: 86, rainfall: 14.2, windSpeed: 8.5, condition: 'Overcast & Humid', updatedAt: new Date() },
  Amravati: { location: 'Amravati', temp: 29.8, humidity: 78, rainfall: 4.5, windSpeed: 6.0, condition: 'Partly Sunny', updatedAt: new Date() },
  Nashik: { location: 'Nashik', temp: 24.5, humidity: 94, rainfall: 26.0, windSpeed: 11.2, condition: 'Continuous Rain & Mist', updatedAt: new Date() },
  Pune: { location: 'Pune', temp: 28, humidity: 65, rainfall: 1.2, windSpeed: 5.5, condition: 'Clear & Sunny', updatedAt: new Date() },
  Wardha: { location: 'Wardha', temp: 30.5, humidity: 62, rainfall: 0.0, windSpeed: 7.2, condition: 'Clear & Sunny', updatedAt: new Date() },
  Nagpur: { location: 'Nagpur', temp: 31, humidity: 68, rainfall: 0.0, windSpeed: 6.0, condition: 'Partly Cloudy', updatedAt: new Date() },
  Washim: { location: 'Washim', temp: 30, humidity: 82, rainfall: 8.0, windSpeed: 6.0, condition: 'Cloudy', updatedAt: new Date() },
  Bhandara: { location: 'Bhandara', temp: 29, humidity: 88, rainfall: 15.0, windSpeed: 5.0, condition: 'Humid & Overcast', updatedAt: new Date() },
  Yavatmal: { location: 'Yavatmal', temp: 32, humidity: 84, rainfall: 11.0, windSpeed: 7.0, condition: 'Overcast', updatedAt: new Date() },
  Buldhana: { location: 'Buldhana', temp: 30, humidity: 82, rainfall: 9.8, windSpeed: 5.5, condition: 'Humid', updatedAt: new Date() },
  Kolhapur: { location: 'Kolhapur', temp: 27, humidity: 79, rainfall: 8.5, windSpeed: 4.5, condition: 'Partly Cloudy', updatedAt: new Date() },
  Solapur: { location: 'Solapur', temp: 33, humidity: 71, rainfall: 3.0, windSpeed: 5.0, condition: 'Warm & Dry', updatedAt: new Date() },
  Jalgaon: { location: 'Jalgaon', temp: 33, humidity: 81, rainfall: 12.0, windSpeed: 5.5, condition: 'Humid & Warm', updatedAt: new Date() },
  Chandrapur: { location: 'Chandrapur', temp: 31, humidity: 75, rainfall: 5.0, windSpeed: 6.0, condition: 'Partly Cloudy', updatedAt: new Date() },
};

// ── Repository Class ──
class InMemoryDB {
  constructor() {
    this.users = [...users];
    this.cases = [...cases];
    this.alerts = [...alerts];
    this.weatherRecords = { ...weatherRecords };
    this.followUps = [];
  }

  // ── Users ──
  findUserByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }
  findUserById(id) {
    return this.users.find((u) => u._id === id) || null;
  }
  createUser(data) {
    const user = { _id: `u-${Date.now()}`, ...data, createdAt: new Date() };
    this.users.push(user);
    return user;
  }

  // ── Cases ──
  findAllCases(filter = {}) {
    let result = [...this.cases];
    if (filter.status) result = result.filter((c) => c.status === filter.status);
    if (filter.district) result = result.filter((c) => c.district === filter.district);
    if (filter.crop) result = result.filter((c) => c.crop.toLowerCase() === filter.crop.toLowerCase());
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  findCaseById(id) {
    return this.cases.find((c) => c._id === id) || null;
  }
  createCase(data) {
    const newCase = {
      _id: `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      status: 'PENDING_REVIEW',
      expertValidation: null,
      followUps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.cases.push(newCase);
    return newCase;
  }
  updateCase(id, updates) {
    const idx = this.cases.findIndex((c) => c._id === id);
    if (idx === -1) return null;
    this.cases[idx] = { ...this.cases[idx], ...updates, updatedAt: new Date() };
    return this.cases[idx];
  }

  // ── Alerts ──
  findAllAlerts() {
    return [...this.alerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  markAlertRead(id) {
    const alert = this.alerts.find((a) => a._id === id);
    if (alert) alert.isRead = true;
    return alert;
  }
  createAlert(data) {
    const alert = { _id: `alert-${Date.now()}`, ...data, isRead: false, createdAt: new Date() };
    this.alerts.push(alert);
    return alert;
  }

  // ── Weather ──
  getWeather(location) {
    return this.weatherRecords[location] || this.weatherRecords['Akola'];
  }

  // ── Follow-ups ──
  createFollowUp(data) {
    const followUp = { _id: `fu-${Date.now()}`, ...data, createdAt: new Date() };
    this.followUps.push(followUp);
    // Also attach to case
    const caseItem = this.findCaseById(data.caseId);
    if (caseItem) {
      if (!caseItem.followUps) caseItem.followUps = [];
      caseItem.followUps.push(followUp);
    }
    return followUp;
  }
  getFollowUpsByCaseId(caseId) {
    return this.followUps.filter((f) => f.caseId === caseId);
  }
}

// Singleton
const db = new InMemoryDB();
module.exports = db;
