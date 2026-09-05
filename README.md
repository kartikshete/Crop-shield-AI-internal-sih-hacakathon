# Zenith CropShield

Zenith CropShield is an end-to-end AI platform for precision agriculture, combining real-time crop disease diagnosis and predictive risk analytics to protect crop yields.

## Project Structure

```
zenith-cropshield/
│
├── frontend/             # React dashboard & user interface
│   ├── public/           # Static assets & HTML template
│   └── src/              # Application source code
│       ├── components/   # UI components
│       ├── pages/        # Application view pages
│       ├── services/     # API integration services
│       ├── hooks/        # Custom React hooks
│       ├── assets/       # Media & style assets
│       └── App.jsx       # Root React component
│
├── backend/              # Node.js Express REST API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API route definitions
│   │   ├── models/       # Database schemas / models
│   │   ├── services/     # Business logic & ML bridges
│   │   ├── middleware/   # Authentication, upload, error middleware
│   │   └── config/       # Environment & server config
│   └── package.json
│
├── ml-models/            # Machine learning & computer vision pipelines
│   ├── disease-detection/# Models for leaf pathology classification
│   ├── risk-prediction/  # Outbreak risk assessment models
│   └── notebooks/        # Jupyter experimentation notebooks
│
├── data/                 # Datasets & annotations
│   ├── raw/              # Raw imagery & sensor logs
│   ├── processed/        # Preprocessed features & cleaned datasets
│   └── README.md
│
├── docs/                 # Documentation
│   ├── architecture.md   # Architectural design & system topology
│   ├── api.md            # REST API endpoints & schemas
│   └── research.md       # Agronomic studies & ML research papers
│
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm start
```
