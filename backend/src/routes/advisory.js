const express = require('express');
const router = express.Router();

const advisoryDB = {
  'alternaria leaf spot': {
    disease: 'Alternaria Leaf Spot',
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
      advisoryNote: 'Chemical fungicide NOT warranted at current moderate threshold.',
      contingency: 'If lesions expand to > 30% canopy within 72 hours, consult KVK agronomist.',
    },
  },
  'bacterial pustule': {
    disease: 'Bacterial Pustule',
    approach: 'IPM-FIRST',
    cultural: ['Remove severely affected leaves.', 'Avoid working in wet fields.'],
    mechanical: ['Install yellow sticky traps.'],
    biological: ['Apply Pseudomonas fluorescens @ 5 g/L.'],
    chemical: { warranted: false, advisoryNote: 'Chemical not warranted at moderate level.' },
  },
  'rice blast': {
    disease: 'Rice Blast',
    approach: 'IPM-FIRST',
    cultural: ['Maintain optimum water depth.', 'Avoid excess nitrogen.', 'Use resistant varieties.'],
    mechanical: [],
    biological: ['Apply Trichoderma harzianum @ 4 g/L.'],
    chemical: { warranted: false, advisoryNote: 'Monitor for 48h before considering fungicide.' },
  },
  default: {
    disease: 'General',
    approach: 'IPM-FIRST',
    cultural: ['Maintain field hygiene.', 'Remove affected plant parts.'],
    mechanical: ['Install monitoring traps.'],
    biological: ['Apply bio-agents as preventive measure.'],
    chemical: { warranted: false, advisoryNote: 'No chemical intervention required for healthy crops.' },
  },
};

// GET /api/advisory/:disease
router.get('/:disease', (req, res) => {
  const key = req.params.disease.toLowerCase();
  const advisory = advisoryDB[key] || advisoryDB['default'];
  res.json({ success: true, data: advisory });
});

module.exports = router;
