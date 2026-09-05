# ZENITH CROPShield — End-to-End System Architecture Plan

> **SIH 2026 Innovation**: *“Don’t wait for the farmer to see the disease. Predict where the disease is likely to appear next.”*

---

## 1. System Philosophy & The 6-Stage Closed Loop Lifecycle

```
    ┌────────────────────────────────────────────────────────┐
    │          ZENITH CROPShield Closed-Loop Lifecycle       │
    └────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
      [ 1. DETECT ]                         [ 2. PREDICT ]
  Farmer captures foliage              Microclimate Risk Engine
  Image Quality Gate (Blur/Light)      Weather (Temp, RH, Rain)
  Vision AI (Pathology + Conf)         Host Phenology + Spore Model
  Explainable AI (Grad-CAM)            3–7 Day Outbreak Forecast
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
                        [ 3. VALIDATE ]
                Expert Human-in-the-Loop Triage
                Prioritize by Uncertainty & Risk
                Confirm / Correct / Request Retake
                               │
                               ▼
                           [ 4. ACT ]
                 IPM-First Tiered Advisory
                 Sanitation ➔ Traps ➔ Bio ➔ Safe Chem
                 Dynamic Actionable Push Notifications
                               │
                               ▼
                           [ 5. MAP ]
               Maharashtra Geospatial Surveillance
               District-Level Epidemiological Choropleth
               Privacy-Preserving Hotspot Clustering
                               │
                               ▼
                          [ 6. LEARN ]
               Agronomist Correction Feedback Loop
               Retraining Data Curation Pipeline
               Continuous Accuracy Optimization
```

---

## 2. High-Level System Architecture & Tier Topology

```
+-------------------------------------------------------------------------+
|                         PRESENTATION LAYER                              |
|                                                                         |
|   +-----------------------+  +--------------------+  +--------------+   |
|   |    Farmer Portal      |  |  Expert Dashboard  |  |  Govt / Map  |   |
|   |  - Camera & Upload    |  |  - Triage Queue    |  |  - Choropleth|   |
|   |  - Quality Feedback   |  |  - Grad-CAM Review |  |  - Hotspots  |   |
|   |  - IPM Advisory Card  |  |  - Diagnosis Edit  |  |  - Trends    |   |
|   |  - Marathi/Hindi/Eng  |  |  - Alert Dispatch  |  |  - Export    |   |
|   +-----------------------+  +--------------------+  +--------------+   |
|                               │ (HTTPS / REST JSON)                     |
+-------------------------------┼-----------------------------------------+
                                ▼
+-------------------------------------------------------------------------+
|                     APPLICATION & GATEWAY LAYER                         |
|                     (Node.js / Express.js Engine)                       |
|                                                                         |
|   [ Rate Limiter & Helmet ] ───► [ Auth Middleware (JWT) ]              |
|                                           │                             |
|   +---------------------------------------┴-------------------------+   |
|   │                       Express Router Layer                      │   |
|   │  /api/auth   /api/detection   /api/risk   /api/weather          │   |
|   │  /api/map    /api/expert      /api/alerts /api/follow-up        │   |
|   +-----------------------------------+-----------------------------+   |
|                                       │                                 |
|            ┌──────────────────────────┴───────────────────────┐         |
|            ▼                                                  ▼         |
|   [ Controllers Layer ]                              [ Service Layer ]  |
|   - Case Controller                                  - AI Bridge Service|
|   - Expert Controller                                - Risk Aggregator  |
|   - Surveillance Controller                          - Advisory Engine  |
|                                                      - Weather Client   |
+---------------------------------------┬───────────────────────┬---------+
                                        │                       │
                                        ▼                       ▼
+-----------------------------------------------+ +-----------------------+
|              DATA & STORAGE LAYER             | |   AI & ML ENGINE      |
|             (MongoDB / Mongoose)              | |  (FastAPI / Python)   |
|                                               | |                       |
|   Collections:                                | | 1. Quality Gate       |
|   - users (Farmers, Experts, Admins)          | |    - Blur Variance    |
|   - crop_cases (Foliage scans & status)       | |    - Exposure HSV     |
|   - detections (Disease, conf, CAM heatmaps)  | | 2. Vision Classifier  |
|   - risk_assessments (Microclimate scores)    | |    - MobileNetV3/EffNet|
|   - district_risks (Maharashtra aggregations) | | 3. Explainability     |
|   - expert_validations (Audit trail / learn)  | |    - Grad-CAM Heatmap |
|   - community_alerts (Localized broadcasts)   | | 4. Outbreak Forecaster|
|                                               | |    - 3-7 Day Spore Sim|
+-----------------------------------------------+ +-----------------------+
```

---

## 3. Strict Safety Rule & IPM-First Advisory Engine

ZENITH CROPShield strictly prohibits blind, automated pesticide suggestions. Pesticides represent financial burden, soil degradation, and ecological harm if mishandled.

### Advisory Escalation Hierarchy:
1. **Tier 1: Cultural & Agronomic Sanitation**
   - Immediate leaf defoliation of necrotic tissue; field clearance of fallen infected leaves.
   - Modification of microclimate: wider row spacing, ridge cultivation, avoiding overhead sprinkler irrigation during spore dispersion hours.
2. **Tier 2: Physical & Mechanical Monitoring**
   - Yellow/blue sticky traps for vector sucking pests (whiteflies, thrips, aphids).
   - Pheromone traps (e.g., Helilure / Gossyplure) to establish Economic Threshold Levels (ETL).
3. **Tier 3: Biological Interventions**
   - Biocontrol agents: *Trichoderma viride* / *Trichoderma harzianum* for root and foliar fungal pathogens.
   - *Pseudomonas fluorescens* seed and soil treatment.
   - Botanical sprays: 5% Neem Seed Kernel Extract (NSKE) or Azadirachtin 1500 ppm.
4. **Tier 4: Chemical Intervention (Strictly Gated)**
   - Only recommended when AI severity is HIGH, confidence is high, or human agronomist validates.
   - Must cite approved Central Insecticide Board & Registration Committee (CIBRC) / ICAR recommendations.
   - Mandatory Personal Protective Equipment (PPE) warnings and pre-harvest interval (PHI) notifications.

---

## 4. Privacy-Preserving Geographic Aggregation

To safeguard farmer privacy and prevent land valuation exploitation:
- **No exact farm coordinates** are rendered publicly on surveillance heatmaps.
- GPS coordinates are processed with **Gaussian spatial jittering (2.5 km)** or aggregated strictly to **Taluka / District centroids**.
- Public surveillance displays density contours and aggregated case counts ($N \ge 3$) to guarantee k-anonymity.
