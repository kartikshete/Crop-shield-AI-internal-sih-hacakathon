# System Architecture

## Overview
Zenith CropShield is an intelligent crop health management system combining computer vision for disease detection with predictive analytics for disease outbreak risk.

## Components
1. **Frontend (React)**: User-friendly web dashboard for farmers and agronomists to upload leaf images, view disease diagnosis, and monitor risk heatmaps.
2. **Backend (Node.js/Express)**: REST API gateway handling file uploads, user management, telemetry ingestion, and communication with ML inference services.
3. **ML Pipeline (Python / PyTorch / TensorFlow)**:
   - **Disease Detection**: Convolutional neural networks / Vision Transformers trained on leaf pathology imagery.
   - **Risk Prediction**: Environmental models utilizing weather, humidity, and soil metrics to predict outbreak likelihood.
4. **Data Layer**: Stores raw/processed imagery, telemetry, and structured analysis records.
