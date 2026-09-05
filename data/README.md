# Data Directory

This directory holds the raw and processed datasets used for model training, evaluation, and risk analysis.

## Structure

- `raw/`: Unprocessed crop imagery, agricultural sensor data, weather logs, and public datasets (e.g., PlantVillage).
- `processed/`: Cleaned, normalized, augmented images, and preprocessed tabular features ready for model pipelines.

## Guidelines
- Do not commit large binary datasets directly to Git. Use cloud storage or DVC where applicable.
- Ensure all sensitive data and API keys are scrubbed before saving processed datasets.
