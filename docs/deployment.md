# ZENITH CROPShield — Deployment & Local Setup Guide

This guide outlines how to run the entire ZENITH CROPShield ecosystem locally or via Docker Compose.

---

## 1. Quick Start with Docker Compose

Ensure Docker and Docker Compose are installed:
```bash
# Clone and enter workspace
cd /Users/kartikshete/cropshield

# Spin up MongoDB, ML-Service, Backend, and Frontend
docker-compose up --build
```

### Services Exposed:
| Service | Technology | Port | URL |
| :--- | :--- | :--- | :--- |
| **Frontend** | React + Vite + Tailwind | `5173` | `http://localhost:5173` |
| **Backend Gateway** | Node.js + Express | `5000` | `http://localhost:5000` |
| **ML Service** | Python + FastAPI | `8000` | `http://localhost:8000/docs` |
| **Database** | MongoDB | `27017` | `mongodb://localhost:27017/cropshield` |

---

## 2. Manual Development Setup

### A. ML Service (FastAPI)
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### B. Backend API Gateway (Node.js)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### C. Frontend Dashboard (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 3. Environment Variables

### Backend (`backend/.env`)
```ini
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cropshield
JWT_SECRET=zenith_cropshield_super_secret_sih_key
ML_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

### ML Service (`ml-service/.env`)
```ini
HOST=0.0.0.0
PORT=8000
USE_MOCK_ML=true
LOG_LEVEL=info
```
