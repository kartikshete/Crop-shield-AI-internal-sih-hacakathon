# API Specification

## Base URL
`/api/v1`

## Endpoints

### 1. Disease Detection
- **POST** `/detect`
  - **Description**: Upload a crop leaf image for pathology classification.
  - **Payload**: `multipart/form-data` with field `image`.
  - **Response**:
    ```json
    {
      "status": "success",
      "disease": "Tomato Early Blight",
      "confidence": 0.96,
      "remedies": [
        "Apply copper-based fungicide",
        "Improve air circulation and avoid overhead watering"
      ]
    }
    ```

### 2. Risk Prediction
- **POST** `/predict-risk`
  - **Description**: Predict localized risk of disease outbreak based on environmental metrics.
  - **Payload**:
    ```json
    {
      "crop": "Tomato",
      "temperature": 28.5,
      "humidity": 82,
      "rainfall": 15.2
    }
    ```
  - **Response**:
    ```json
    {
      "riskLevel": "HIGH",
      "outbreakProbability": 0.78,
      "recommendations": "Preemptive spray recommended within 48 hours."
    }
    ```
