from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="Zenith CropShield ML Service")

# Allow CORS for integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskInput(BaseModel):
    crop: str
    district: str
    disease: str
    severity: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ML Service"}

@app.post("/predict/image-quality")
async def check_image_quality(file: UploadFile = File(...)):
    # Deterministic mock based on filename size or random string
    return {
        "passed": True,
        "blurScore": 150.2,
        "illuminationScore": 135.0,
        "exposure": "NORMAL",
        "statusText": "Passed",
        "issues": []
    }

@app.post("/predict/disease")
async def predict_disease(
    file: UploadFile = File(...),
    crop: str = Form("Cotton"),
    district: str = Form("Akola")
):
    crop_lower = crop.lower()
    if "cotton" in crop_lower:
        return {
            "diseaseName": "Alternaria Leaf Spot",
            "confidence": 0.88,
            "severity": "MODERATE",
            "alternatives": [
                {"diseaseName": "Bacterial Blight", "confidence": 0.08}
            ],
            "explanation": {
                "symptomsObserved": ["Concentric circular brown necrotic rings"],
                "affectedZone": "Mid to lower plant canopy"
            }
        }
    elif "soybean" in crop_lower:
        return {
            "diseaseName": "Bacterial Pustule",
            "confidence": 0.74,
            "severity": "MODERATE",
            "alternatives": [],
            "explanation": {
                "symptomsObserved": ["Small raised pustules"],
                "affectedZone": "Lower canopy"
            }
        }
    
    return {
        "diseaseName": "Healthy Crop Foliage",
        "confidence": 0.96,
        "severity": "MILD",
        "alternatives": [],
        "explanation": {
            "symptomsObserved": ["Uniform green color"],
            "affectedZone": "None"
        }
    }

@app.post("/predict/risk")
def predict_risk(data: RiskInput):
    # Deterministic mock
    return {
        "score": 82 if data.crop.lower() == "cotton" else 65,
        "level": "HIGH" if data.crop.lower() == "cotton" else "MODERATE",
        "factors": ["High Humidity", "Recent cases in region"],
        "explanation": "Calculated based on local microclimate data."
    }

@app.post("/predict/forecast")
def predict_forecast(data: RiskInput):
    return {
        "days": [1,2,3,4,5,6,7],
        "riskTrend": [82, 85, 88, 78, 66, 54, 42],
        "warning": "Risk expected to peak in 3 days."
    }

