# ZENITH CROPShield — ML Service Architecture & Model Specifications

## Overview
The ML Service is a standalone microservice powered by **Python 3.10+** and **FastAPI**. It decouples heavy scientific computing, computer vision, and tensor operations from the Node.js API Gateway.

---

## 1. Multi-Stage AI Pipeline

```text
Input Leaf Image
       │
       ▼
[Stage 1: Image Quality Gate] ── (Blur / Lighting Fail) ──► Early Exit: AI UNCERTAIN
       │ (Pass)
       ▼
[Stage 2: Vision Classification Engine] (MobileNetV3 / EfficientNet / Mock Switch)
       │
       ▼
[Stage 3: Explainable AI & Uncertainty Gate] (Grad-CAM & Confidence Floor)
       │
       ▼
[Stage 4: Epidemiological Risk Modeling] (Weather + Host Stage + Regional Pressure)
       │
       ▼
[Output: Comprehensive Pathology & Risk Forecast Contract]
```

---

## 2. Stage 1: Image Quality Gate
Before passing images into neural networks, the quality gate validates usability:
- **Blur Detection**: OpenCV Laplacian Variance algorithm.
  $$\text{Var}(\Delta I) = \frac{1}{N} \sum (L(x,y) - \bar{L})^2$$
  - Threshold: $< 100.0 \implies$ Blurry image flagged.
- **Illumination Check**: HSV color-space mean Value ($V$).
  - Mean $V < 40 \implies$ Underexposed / Too dark.
  - Mean $V > 240 \implies$ Overexposed / Washed out.
- **Safety Exit**: If quality fails, the system bypasses disease prediction and returns status `AI_UNCERTAIN` with corrective prompts ("Retake photo in indirect daylight").

---

## 3. Stage 2: Model Architecture & Abstraction
The service implements a Model Abstraction Strategy via `BaseDiseaseModel`:
```python
class BaseDiseaseModel(ABC):
    @abstractmethod
    def predict(self, image_tensor: torch.Tensor, crop: str) -> DiseasePrediction:
        pass
```
- **Real Implementation**: PyTorch `timm` MobileNetV3-Large or EfficientNet-B2 fine-tuned on PlantVillage + regional Vidarbha/Marathwada field imagery.
- **Deterministic Mock Engine (`deterministic_mock_service.py`)**: Provides instant, reproducible results for hackathon evaluation:
  - *Cotton Scenario*: Alternaria Leaf Spot, 87% confidence, Moderate severity.
  - *Soybean Scenario*: Bacterial Pustule, 74% confidence.
  - *Healthy Scenario*: Healthy Foliage, 96% confidence.
  - *Quality Fail Scenario*: Rejection triggers actionable UI prompts.

---

## 4. Stage 3: Risk Engine & 3–7 Day Forecast
Epidemiological outbreak dynamics are calculated using microclimate parameters:
- **Formula Components**:
  $$R = w_t \cdot f(T) + w_h \cdot f(RH) + w_r \cdot f(\text{Rain}) + w_p \cdot \text{RegionalPressure}$$
  - Temperature ($T$): Fungal proliferation optimal at $26^\circ\text{C} - 32^\circ\text{C}$.
  - Relative Humidity ($RH$): $> 80\%$ drastically increases sporulation.
  - Regional Disease Pressure: Active verified cases in the same district.
- **Forecast Output**: Computes probability shifts over 3, 5, and 7 days.

---

## 5. Transitioning from Mock to Production Model
1. Place PyTorch weights (`.pt` or `.onnx`) in `ml-service/app/models/weights/`.
2. Set environment variable in `ml-service/.env`:
   ```bash
   USE_MOCK_ML=false
   MODEL_WEIGHTS_PATH=app/models/weights/cropshield_mobilenetv3.pt
   ```
3. Restart FastAPI container. The API contracts remain 100% identical.
