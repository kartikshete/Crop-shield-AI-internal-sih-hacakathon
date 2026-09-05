# ZENITH CROPShield — Database Architecture & Schema Design

## Database Technology
- **Engine**: MongoDB (v6.0+)
- **ORM / ODM**: Mongoose (v8.0+)
- **Design Philosophy**: Hybrid relational-document model with optimized geospatial and temporal query indexes.

---

## Collections & Schemas

### 1. `users`
Represents registered platform actors (farmers, experts, surveillance admins).
```typescript
interface User {
  _id: ObjectId;
  name: string;
  phone: string; // Unique, login credential
  role: 'farmer' | 'expert' | 'admin';
  district: string; // e.g. "Akola", "Amravati"
  taluka?: string;
  preferredLanguage: 'en' | 'hi' | 'mr';
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ phone: 1 }` (unique)
- `{ district: 1, role: 1 }`

---

### 2. `crop_cases`
Primary event record instantiated when a crop photo or advisory query is submitted.
```typescript
interface CropCase {
  _id: ObjectId;
  caseNumber: string; // Human-friendly e.g. "CS-2026-1023"
  userId?: ObjectId; // Ref: User
  crop: 'Cotton' | 'Soybean' | 'Tomato' | 'Paddy' | 'Sugarcane';
  cropStage?: 'Seedling' | 'Vegetative' | 'Flowering' | 'Maturity';
  district: string;
  imageUrl: string;
  imageQuality: {
    passed: boolean;
    blurScore: number;
    illuminationScore: number;
    issues: string[];
  };
  detectionId?: ObjectId; // Ref: Detection
  riskAssessmentId?: ObjectId; // Ref: RiskAssessment
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'CORRECTED' | 'RETAKE_REQUESTED';
  isDemo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes**:
- `{ district: 1, createdAt: -1 }`
- `{ status: 1 }`
- `{ caseNumber: 1 }` (unique)

---

### 3. `detections`
Pathology diagnosis returned by Vision AI or deterministic mock engine.
```typescript
interface Detection {
  _id: ObjectId;
  caseId: ObjectId; // Ref: CropCase
  diseaseName: string; // e.g. "Alternaria Leaf Spot"
  confidence: number; // 0.00 to 1.00
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  alternatives: Array<{
    diseaseName: string;
    confidence: number;
  }>;
  explanation: {
    symptomsObserved: string[];
    affectedZone: string;
    camHeatmapUrl?: string;
  };
  createdAt: Date;
}
```
**Indexes**:
- `{ caseId: 1 }` (unique)

---

### 4. `risk_assessments`
Microclimate risk evaluation and predictive outbreak modeling.
```typescript
interface RiskAssessment {
  _id: ObjectId;
  caseId: ObjectId; // Ref: CropCase
  district: string;
  crop: string;
  riskScore: number; // 0 to 100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  weatherSnapshot: {
    temperature: number;
    humidity: number;
    rainfall: number;
    forecastCondition: string;
  };
  contributingFactors: string[];
  forecastTimeline: Array<{
    day: number;
    date: string;
    predictedRiskScore: number;
    predictedRiskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  }>;
  createdAt: Date;
}
```
**Indexes**:
- `{ district: 1, riskLevel: 1 }`
- `{ caseId: 1 }`

---

### 5. `district_risks`
Aggregated epidemiological surveillance cache used by the Maharashtra Map layer.
```typescript
interface DistrictRisk {
  _id: ObjectId;
  districtName: string; // e.g. "Akola", "Buldhana", "Amravati", "Pune"
  state: string; // "Maharashtra"
  dominantCrop: string;
  activeCases: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  riskScore: number;
  trend: 'RISING' | 'STABLE' | 'DECLINING';
  dominantThreat: string;
  recommendedResponse: string;
  hotspotsCount: number;
  lastUpdated: Date;
}
```
**Indexes**:
- `{ districtName: 1 }` (unique)
- `{ riskLevel: 1 }`

---

### 6. `expert_validations`
Audit trail of agronomist corrections and confirmations (continuous learning data).
```typescript
interface ExpertValidation {
  _id: ObjectId;
  caseId: ObjectId; // Ref: CropCase
  expertId: ObjectId; // Ref: User
  action: 'CONFIRM' | 'CORRECT' | 'REQUEST_IMAGE';
  initialPrediction: string;
  confirmedDisease: string;
  notes?: string;
  validatedAt: Date;
}
```
**Indexes**:
- `{ caseId: 1 }`
- `{ expertId: 1, validatedAt: -1 }`

---

### 7. `community_alerts`
Localized broadcast alerts pushed to farmers in vulnerable districts.
```typescript
interface CommunityAlert {
  _id: ObjectId;
  district: string;
  crop: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  actionRequired: string;
  issuedAt: Date;
  expiresAt: Date;
}
```
**Indexes**:
- `{ district: 1, expiresAt: 1 }`
