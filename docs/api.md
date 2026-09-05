# ZENITH CROPShield — REST API Specification

## Base URL
`/api`

---

## 1. Authentication (`/api/auth`)

### `POST /auth/register`
Create a new farmer or expert account.
- **Request Body**:
  ```json
  {
    "name": "Ramesh Patil",
    "phone": "9876543210",
    "role": "farmer",
    "district": "Akola",
    "preferredLanguage": "mr"
  }
  ```
- **Response** `201 Created`:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": {
      "id": "64f1a2b...",
      "name": "Ramesh Patil",
      "role": "farmer",
      "district": "Akola",
      "preferredLanguage": "mr"
    }
  }
  ```

### `POST /auth/login`
Authenticate via phone number and OTP/credentials.
- **Request Body**: `{ "phone": "9876543210", "password": "password123" }`
- **Response** `200 OK`: Returns JWT token & user object.

### `GET /auth/me`
Retrieve currently logged-in user profile (Requires `Bearer <token>`).

---

## 2. Detection & Diagnosis (`/api/detection`)

### `POST /detection`
Upload crop image for quality verification and disease classification.
- **Headers**: `Content-Type: multipart/form-data`, `Authorization: Bearer <token>` (optional)
- **Form Fields**:
  - `image`: Binary file (JPEG/PNG, max 10MB)
  - `crop`: `"Cotton" | "Soybean" | "Tomato" | "Paddy"`
  - `district`: `"Akola"`
  - `isDemo`: `true | false`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "caseId": "CS-2026-1023",
    "quality": {
      "passed": true,
      "blurScore": 142.5,
      "status": "GOOD"
    },
    "diagnosis": {
      "disease": "Alternaria Leaf Spot",
      "confidence": 0.87,
      "severity": "MODERATE",
      "alternatives": [
        { "disease": "Bacterial Blight", "confidence": 0.09 },
        { "disease": "Healthy", "confidence": 0.04 }
      ],
      "explanation": "Concentric brown rings observed on mid-canopy foliage."
    },
    "risk": {
      "overallRisk": "HIGH",
      "riskScore": 82,
      "contributingFactors": ["High humidity (84%)", "Recent rain events", "Active local cases: 18"]
    },
    "advisory": {
      "approach": "IPM-FIRST",
      "cultural": "Remove lower infected leaves to curb spore dispersal.",
      "biological": "Apply Trichoderma viride bio-agent around soil base.",
      "chemicalWarning": "No emergency chemical spray warranted at current severity. Re-evaluate in 3 days."
    }
  }
  ```

### `GET /detection/:id`
Fetch complete pathology diagnosis, risk analysis, and expert validation history for a case.

### `GET /detection/history`
List previous diagnosis cases submitted by the authenticated user.

---

## 3. Weather & Microclimate (`/api/weather`)

### `GET /weather`
Query parameters: `?district=Akola`
- **Response** `200 OK`:
  ```json
  {
    "district": "Akola",
    "temperature": 31.2,
    "humidity": 84,
    "rainfall": 12.4,
    "windSpeed": 9.2,
    "condition": "Humid / Overcast"
  }
  ```

---

## 4. Risk Engine & Forecasting (`/api/risk`)

### `POST /risk/evaluate`
Calculate outbreak probability for custom environmental parameters.
- **Request Body**:
  ```json
  {
    "crop": "Cotton",
    "district": "Akola",
    "growthStage": "Flowering",
    "temperature": 31.0,
    "humidity": 85.0,
    "rainfall": 10.0
  }
  ```

### `GET /risk/forecast/:district`
Get a 7-day predictive epidemiological risk forecast.
- **Response** `200 OK`:
  ```json
  {
    "district": "Akola",
    "crop": "Cotton",
    "forecast": [
      { "day": 1, "date": "2026-09-06", "riskScore": 35, "level": "LOW" },
      { "day": 2, "date": "2026-09-07", "riskScore": 58, "level": "MODERATE" },
      { "day": 3, "date": "2026-09-08", "riskScore": 82, "level": "HIGH", "warning": "OUTBREAK WARNING" },
      { "day": 4, "date": "2026-09-09", "riskScore": 88, "level": "HIGH" },
      { "day": 5, "date": "2026-09-10", "riskScore": 76, "level": "HIGH" },
      { "day": 6, "date": "2026-09-11", "riskScore": 62, "level": "MODERATE" },
      { "day": 7, "date": "2026-09-12", "riskScore": 45, "level": "LOW" }
    ]
  }
  ```

---

## 5. Surveillance Map (`/api/map`)

### `GET /map/districts`
Aggregated district statistics for Maharashtra map rendering.
- **Response** `200 OK`:
  ```json
  [
    {
      "district": "Akola",
      "coordinates": [20.7002, 77.0082],
      "dominantCrop": "Cotton",
      "riskLevel": "HIGH",
      "riskScore": 84,
      "activeCases": 18,
      "trend": "RISING",
      "threat": "Alternaria Leaf Spot",
      "response": "Deploy IPM field sanitation and initiate block-level advisory."
    },
    {
      "district": "Buldhana",
      "coordinates": [20.5293, 76.1843],
      "dominantCrop": "Cotton",
      "riskLevel": "HIGH",
      "riskScore": 79,
      "activeCases": 11,
      "trend": "RISING",
      "threat": "Bacterial Blight",
      "response": "Seed treatment verification and moisture control."
    },
    {
      "district": "Amravati",
      "coordinates": [20.9374, 77.7796],
      "dominantCrop": "Soybean",
      "riskLevel": "MODERATE",
      "riskScore": 55,
      "activeCases": 7,
      "trend": "STABLE",
      "threat": "Yellow Mosaic Virus",
      "response": "Monitor whitefly vectors."
    },
    {
      "district": "Pune",
      "coordinates": [18.5204, 73.8567],
      "dominantCrop": "Mixed / Vegetables",
      "riskLevel": "LOW",
      "riskScore": 22,
      "activeCases": 2,
      "trend": "STABLE",
      "threat": "Downy Mildew",
      "response": "Standard crop management."
    }
  ]
  ```

### `GET /map/hotspots`
Aggregated privacy-preserving cluster points for Leaflet heatmap layer.

### `GET /map/trends`
30-day case trajectories grouped by crop and district.

---

## 6. Expert Validation (`/api/expert`)

### `GET /expert/cases`
Fetch prioritized case queue for agronomists (sorted by uncertainty, risk level, or recency).
- **Query Parameters**: `?status=PENDING_REVIEW&district=Akola&page=1&limit=10`

### `GET /expert/cases/:id`
Full diagnostic telemetry for validation.

### `POST /expert/cases/:id/validate`
Submit human-in-the-loop validation:
- **Request Body**:
  ```json
  {
    "action": "CONFIRM", // "CONFIRM" | "CORRECT" | "REQUEST_IMAGE"
    "verifiedDisease": "Alternaria Leaf Spot",
    "expertNotes": "Classic concentric ring necrosis verified on mid-canopy leaves.",
    "triggerCommunityAlert": true
  }
  ```

---

## 7. Community Alerts (`/api/alerts`)

### `GET /alerts`
Retrieve active localized alerts for farmer's district.

### `POST /alerts/:id/read`
Mark alert as acknowledged.

---

## 8. Follow-Up Reporting (`/api/follow-up`)

### `POST /follow-up`
Submit recovery or worsening report 3–7 days post-advisory.
- **Request Body**:
  ```json
  {
    "caseId": "CS-2026-1023",
    "status": "IMPROVING",
    "treatmentsApplied": ["Removed infected leaves", "Trichoderma applied"],
    "newImage": "(optional file upload)"
  }
  ```
