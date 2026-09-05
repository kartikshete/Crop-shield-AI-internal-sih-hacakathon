export const mockCases = [
  {
    id: "CS-2026-1023",
    farmerName: "Ramesh Patil",
    phone: "9876543210",
    district: "Akola",
    taluka: "Barshitakli",
    village: "Rustampur",
    crop: "Cotton",
    cropStage: "Flowering & Boll Formation",
    createdAt: "2026-09-05T09:30:00Z",
    status: "PENDING_REVIEW", // PENDING_REVIEW | VERIFIED | CORRECTED | RETAKE_REQUESTED
    imageUrl: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=800&q=80",
    imageQuality: {
      passed: true,
      blurScore: 148.6,
      illuminationScore: 132.0,
      exposure: "NORMAL",
      statusText: "Good Resolution & Lighting",
      issues: []
    },
    detection: {
      diseaseName: "Alternaria Leaf Spot",
      diseaseNameMr: "अल्टरनेरिया पानांवरील ठिपके",
      diseaseNameHi: "अल्टरनेरिया पत्ती धब्बा",
      pathogenType: "Fungal (Alternaria macrospora)",
      confidence: 0.88,
      severity: "MODERATE", // MILD | MODERATE | SEVERE
      affectedAreaPercentage: 18,
      alternatives: [
        { diseaseName: "Bacterial Blight (Angular Leaf Spot)", confidence: 0.08 },
        { diseaseName: "Cercospora Leaf Spot", confidence: 0.03 },
        { diseaseName: "Healthy Foliage", confidence: 0.01 }
      ],
      explanation: {
        symptomsObserved: [
          "Concentric circular brown necrotic rings with purple halo margins on mid-canopy leaves",
          "Shot-hole effect beginning to emerge in mature lesion centers",
          "Foliage yellowing adjacent to lesion perimeters"
        ],
        affectedZone: "Mid to lower plant canopy",
        gradCamDesc: "Attention concentrated on necrotic circular lesion margins and chloroplast degradation rings."
      }
    },
    riskAssessment: {
      riskScore: 82, // 0 - 100
      riskLevel: "HIGH", // LOW | MODERATE | HIGH
      cropHealthIndex: 64, // 0 - 100
      contributingFactors: [
        "Sustained relative humidity > 85% for 48 consecutive hours",
        "Recent precipitation event (14.2 mm) creating leaf moisture film",
        "23 active verified Alternaria cases in Akola district cluster"
      ],
      weatherSnapshot: {
        temp: 31.2,
        humidity: 86,
        rainfall: 14.2,
        windSpeed: 8.5,
        condition: "Overcast & Humid"
      },
      forecastTimeline: [
        { day: 1, date: "Today", riskScore: 82, level: "HIGH", desc: "Optimal sporulation moisture" },
        { day: 2, date: "Tomorrow", riskScore: 85, level: "HIGH", desc: "Warm humid winds expanding spore cloud" },
        { day: 3, date: "Day 3", riskScore: 88, level: "HIGH", desc: "Peak secondary infection window" },
        { day: 4, date: "Day 4", riskScore: 78, level: "HIGH", desc: "Rain reduces, morning dew persists" },
        { day: 5, date: "Day 5", riskScore: 66, level: "MODERATE", desc: "Sunlight begins drying canopy" },
        { day: 6, date: "Day 6", riskScore: 54, level: "MODERATE", desc: "Moderate spore activity" },
        { day: 7, date: "Day 7", riskScore: 42, level: "MODERATE", desc: "Stabilizing trend" }
      ]
    },
    advisory: {
      approach: "IPM-FIRST",
      cultural: [
        "Clip and safely bury or burn lower senescent leaves showing severe necrotic rings.",
        "Ensure unimpeded field drainage to prevent root moisture stagnation.",
        "Avoid overhead sprinkler irrigation; irrigate strictly at soil root base."
      ],
      mechanical: [
        "Erect 8-10 yellow sticky cards per acre to trap sucking vector pests.",
        "Install 2 spore monitoring traps at upwind field borders."
      ],
      biological: [
        "Foliar spray of Trichoderma viride @ 4 g/litre of water during early morning or late evening.",
        "Apply 5% Neem Seed Kernel Extract (NSKE) to deter secondary opportunistic infestation."
      ],
      chemical: {
        warranted: false,
        advisoryNote: "Chemical fungicide NOT warranted at current moderate threshold. Re-evaluate in 3 days.",
        contingency: "If lesions expand to > 30% canopy within 72 hours, consult KVK agronomist for Mancozeb 75% WP @ 2.5 g/L under strict safety gear."
      }
    }
  },
  {
    id: "CS-2026-1024",
    farmerName: "Anand Shinde",
    phone: "9823456789",
    district: "Amravati",
    taluka: "Achalpur",
    village: "Paratwada",
    crop: "Soybean",
    cropStage: "Vegetative / Pre-flowering",
    createdAt: "2026-09-05T10:15:00Z",
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    imageQuality: {
      passed: true,
      blurScore: 162.1,
      illuminationScore: 145.0,
      exposure: "NORMAL",
      statusText: "Passed",
      issues: []
    },
    detection: {
      diseaseName: "Yellow Mosaic Virus (YMV)",
      diseaseNameMr: "पिवळा मोझॅक व्हायरस",
      diseaseNameHi: "पीला मोज़ेक वायरस",
      pathogenType: "Begomovirus (Whitefly Vector: Bemisia tabaci)",
      confidence: 0.91,
      severity: "SEVERE",
      affectedAreaPercentage: 35,
      alternatives: [
        { diseaseName: "Soybean Rust", confidence: 0.05 },
        { diseaseName: "Iron Chlorosis Deficiency", confidence: 0.03 },
        { diseaseName: "Healthy Foliage", confidence: 0.01 }
      ],
      explanation: {
        symptomsObserved: [
          "Distinct alternating bright yellow and dark green mosaic patches on young trifoliate leaves",
          "Puckering and downward curling of leaf blade margins",
          "Stunted apical shoot growth"
        ],
        affectedZone: "Young apical foliage and expanding leaves",
        gradCamDesc: "High model saliency focused across interveinal yellow chlorotic sectors."
      }
    },
    riskAssessment: {
      riskScore: 78,
      riskLevel: "HIGH",
      cropHealthIndex: 52,
      contributingFactors: [
        "Whitefly vector density exceeding 5 nymphs per leaf across Achalpur belt",
        "Dry warm spells (29-32°C) promoting rapid insect vector breeding",
        "12 active localized YMV clusters in Amravati"
      ],
      weatherSnapshot: {
        temp: 29.8,
        humidity: 78,
        rainfall: 4.5,
        windSpeed: 6.0,
        condition: "Partly Sunny"
      },
      forecastTimeline: [
        { day: 1, date: "Today", riskScore: 78, level: "HIGH", desc: "High whitefly flight activity" },
        { day: 2, date: "Tomorrow", riskScore: 82, level: "HIGH", desc: "Vector migration across neighboring plots" },
        { day: 3, date: "Day 3", riskScore: 80, level: "HIGH", desc: "Intense transmission window" },
        { day: 4, date: "Day 4", riskScore: 74, level: "HIGH", desc: "Persistent vector pressure" },
        { day: 5, date: "Day 5", riskScore: 68, level: "MODERATE", desc: "Sticky traps begin reducing adult count" },
        { day: 6, date: "Day 6", riskScore: 60, level: "MODERATE", desc: "Stabilizing vector population" },
        { day: 7, date: "Day 7", riskScore: 50, level: "MODERATE", desc: "Contained boundary" }
      ]
    },
    advisory: {
      approach: "IPM-FIRST",
      cultural: [
        "Rogue out and destroy severely yellowed, stunted plants immediately to halt viral inoculum.",
        "Maintain clean weed-free borders (remove Parthenium and Abutilon weed hosts)."
      ],
      mechanical: [
        "Install 12 to 15 bright yellow sticky traps per acre at canopy level for whitefly trapping.",
        "Set up barrier crops (like 2-3 border rows of sorghum or pearl millet)."
      ],
      biological: [
        "Spray Verticillium lecanii / Beauveria bassiana @ 5 g/litre for entomopathogenic whitefly control.",
        "Spray 1500 ppm Azadirachtin (Neem Oil) @ 2.5 ml/L to inhibit whitefly oviposition."
      ],
      chemical: {
        warranted: true,
        advisoryNote: "Severe vector pressure detected. Target whitefly vector to prevent total plot loss.",
        contingency: "Agronomist verified: Diafenthiuron 50% WP @ 1.2 g/L or Thiamethoxam 25% WG @ 0.3 g/L. Always wear safety mask and gloves."
      }
    }
  },
  {
    id: "CS-2026-1025",
    farmerName: "Ganesh Jadhav",
    phone: "9850123456",
    district: "Nashik",
    taluka: "Dindori",
    village: "Khedgaon",
    crop: "Tomato",
    cropStage: "Fruiting & Ripening",
    createdAt: "2026-09-05T11:00:00Z",
    status: "PENDING_REVIEW",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    imageQuality: {
      passed: true,
      blurScore: 175.4,
      illuminationScore: 139.0,
      exposure: "NORMAL",
      statusText: "Passed",
      issues: []
    },
    detection: {
      diseaseName: "Late Blight (Phytophthora infestans)",
      diseaseNameMr: "टोमॅटोवरील उशिरा येणारा करपा",
      diseaseNameHi: "टमाटर का पछेती झुलसा",
      pathogenType: "Oomycete (Phytophthora infestans)",
      confidence: 0.94,
      severity: "SEVERE",
      affectedAreaPercentage: 42,
      alternatives: [
        { diseaseName: "Early Blight (Alternaria solani)", confidence: 0.04 },
        { diseaseName: "Septoria Leaf Spot", confidence: 0.01 },
        { diseaseName: "Healthy Foliage", confidence: 0.01 }
      ],
      explanation: {
        symptomsObserved: [
          "Large, irregular water-soaked pale green lesions turning dark brown to purplish-black",
          "Delicate white fungal downy mold growth visible on leaf undersides under humid conditions",
          "Rapid petiole collapse and dark brown stem cankers"
        ],
        affectedZone: "Upper and middle foliage, fruit calyx",
        gradCamDesc: "Extreme attention spikes on water-soaked lesion borders and abaxial sporulation areas."
      }
    },
    riskAssessment: {
      riskScore: 89,
      riskLevel: "HIGH",
      cropHealthIndex: 45,
      contributingFactors: [
        "Continuous drizzle & persistent leaf wetness duration > 14 hours/day",
        "Cool temperatures (18-22°C night, 24-26°C day) matching optimal Phytophthora infection curve",
        "28 active cases in Nashik vegetable belt"
      ],
      weatherSnapshot: {
        temp: 24.5,
        humidity: 94,
        rainfall: 26.0,
        windSpeed: 11.2,
        condition: "Continuous Rain & Mist"
      },
      forecastTimeline: [
        { day: 1, date: "Today", riskScore: 89, level: "HIGH", desc: "CRITICAL OUTBREAK WARNING: Rapid spore spread" },
        { day: 2, date: "Tomorrow", riskScore: 92, level: "HIGH", desc: "Overnight dew fosters motile zoospores" },
        { day: 3, date: "Day 3", riskScore: 88, level: "HIGH", desc: "Severe blight acceleration" },
        { day: 4, date: "Day 4", riskScore: 82, level: "HIGH", desc: "Rain subsides but humidity stays elevated" },
        { day: 5, date: "Day 5", riskScore: 71, level: "HIGH", desc: "Requires persistent monitoring" },
        { day: 6, date: "Day 6", riskScore: 59, level: "MODERATE", desc: "Dry sun helps check mycelial spread" },
        { day: 7, date: "Day 7", riskScore: 48, level: "MODERATE", desc: "Stabilization under treatment" }
      ]
    },
    advisory: {
      approach: "IPM-FIRST",
      cultural: [
        "Immediately prune blighted leaves into airtight bags; DO NOT throw on compost heaps.",
        "Stake tomato vines upright to maximize air circulation and elevate foliage from moist soil.",
        "Stop all overhead irrigation; ensure drainage trenches are clear."
      ],
      mechanical: [
        "Install plastic rain shelters/mulch over beds to avoid soil-borne spore splashing."
      ],
      biological: [
        "Foliar spray of bio-agent Bacillus subtilis @ 5 g/L to colonize leaf surface prior to rain showers."
      ],
      chemical: {
        warranted: true,
        advisoryNote: "CRITICAL EPIDEMIC LEVEL: Chemical systemic intervention required to prevent 100% crop loss.",
        contingency: "CIBRC Protocol: Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Dimethomorph 50% WP @ 1 g/L. Wear respirator, nitrile gloves, and observe 7-day PHI."
      }
    }
  },
  {
    id: "CS-2026-1026",
    farmerName: "Bapurao Raut",
    phone: "9890987654",
    district: "Wardha",
    taluka: "Hinganghat",
    village: "Alipur",
    crop: "Cotton",
    cropStage: "Vegetative Growth",
    createdAt: "2026-09-05T12:00:00Z",
    status: "VERIFIED",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
    imageQuality: {
      passed: true,
      blurScore: 188.2,
      illuminationScore: 152.0,
      exposure: "NORMAL",
      statusText: "Passed",
      issues: []
    },
    detection: {
      diseaseName: "Healthy Crop Foliage",
      diseaseNameMr: "निरोगी पीक (कोणताही रोग नाही)",
      diseaseNameHi: "स्वस्थ फसल (कोई रोग नहीं)",
      pathogenType: "None",
      confidence: 0.96,
      severity: "MILD",
      affectedAreaPercentage: 0,
      alternatives: [
        { diseaseName: "Early Bacterial Blight Spot", confidence: 0.02 },
        { diseaseName: "Nutrient Stress Minor", confidence: 0.02 }
      ],
      explanation: {
        symptomsObserved: [
          "Uniform dark green leaf color with vibrant venation",
          "No fungal lesions, necrotic circles, or chlorotic mottling detected",
          "Clean leaf margins and healthy apical meristem"
        ],
        affectedZone: "None",
        gradCamDesc: "Uniform feature activation across leaf surface; no focal anomalies."
      }
    },
    riskAssessment: {
      riskScore: 18,
      riskLevel: "LOW",
      cropHealthIndex: 94,
      contributingFactors: [
        "Moderate temperature (30°C) with dry sunny periods",
        "Relative humidity at 62% - below sporulation threshold",
        "Low active case count in Hinganghat taluka"
      ],
      weatherSnapshot: {
        temp: 30.5,
        humidity: 62,
        rainfall: 0.0,
        windSpeed: 7.2,
        condition: "Clear & Sunny"
      },
      forecastTimeline: [
        { day: 1, date: "Today", riskScore: 18, level: "LOW", desc: "Healthy conditions" },
        { day: 2, date: "Tomorrow", riskScore: 20, level: "LOW", desc: "Sunny and dry" },
        { day: 3, date: "Day 3", riskScore: 24, level: "LOW", desc: "Good photosynthetic activity" },
        { day: 4, date: "Day 4", riskScore: 28, level: "LOW", desc: "Light breeze" },
        { day: 5, date: "Day 5", riskScore: 32, level: "LOW", desc: "Slight humidity increase" },
        { day: 6, date: "Day 6", riskScore: 30, level: "LOW", desc: "Normal crop growth" },
        { day: 7, date: "Day 7", riskScore: 25, level: "LOW", desc: "Stable" }
      ]
    },
    advisory: {
      approach: "IPM-FIRST",
      cultural: [
        "Maintain current balanced fertigation schedule (avoid excessive urea).",
        "Keep plot weed-free and inspect foliage twice a week."
      ],
      mechanical: [
        "Maintain prophylactic yellow sticky traps (4-5 per acre)."
      ],
      biological: [
        "Apply preventive spray of Pseudomonas fluorescens @ 5 g/L to boost systemic plant immunity."
      ],
      chemical: {
        warranted: false,
        advisoryNote: "NO CHEMICAL INTERVENTION REQUIRED. Your crop is in excellent health.",
        contingency: "Continue routine scouting."
      }
    }
  },
  {
    id: "CS-2026-1027",
    farmerName: "Santosh Deshmukh",
    phone: "9860012345",
    district: "Akola",
    taluka: "Akot",
    village: "Chohatta",
    crop: "Cotton",
    cropStage: "Flowering",
    createdAt: "2026-09-05T13:20:00Z",
    status: "RETAKE_REQUESTED",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    imageQuality: {
      passed: false,
      blurScore: 42.1, // Less than 100 threshold
      illuminationScore: 28.5, // Less than 40 threshold
      exposure: "UNDEREXPOSED",
      statusText: "Image Quality Failed: Severe Motion Blur & Low Light",
      issues: [
        "Blurry image detected (Laplacian variance 42.1 < 100.0 threshold)",
        "Underexposed lighting (Mean brightness 28.5 < 40.0 threshold)"
      ]
    },
    detection: {
      diseaseName: "AI Uncertain — Quality Gate Check Required",
      diseaseNameMr: "अस्पष्ट फोटो — कृपया पुन्हा फोटो काढा",
      diseaseNameHi: "अस्पष्ट तस्वीर — कृपया पुनः फोटो लें",
      pathogenType: "Uncertain",
      confidence: 0.35,
      severity: "MILD",
      affectedAreaPercentage: 0,
      alternatives: [],
      explanation: {
        symptomsObserved: ["Image features cannot be accurately resolved due to severe motion blur."],
        affectedZone: "Unknown",
        gradCamDesc: "Confidence floor not reached."
      }
    },
    riskAssessment: {
      riskScore: 65,
      riskLevel: "MODERATE",
      cropHealthIndex: 70,
      contributingFactors: ["Regional risk estimated based on Akola location telemetry"],
      weatherSnapshot: { temp: 31, humidity: 85, rainfall: 12 },
      forecastTimeline: []
    },
    advisory: {
      approach: "IPM-FIRST",
      cultural: ["Retake photo under daylight before taking any field action."],
      mechanical: [],
      biological: [],
      chemical: { warranted: false, advisoryNote: "Do not apply chemicals based on uncertain image." }
    }
  }
];
