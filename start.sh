#!/bin/bash

echo "Starting Zenith CropShield Demo..."

# 1. Setup ML Service (FastAPI)
echo "Setting up ML Service..."
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install python-multipart
uvicorn app.main:app --port 8000 &
ML_PID=$!
echo "ML Service started with PID $ML_PID"
cd ..

# 2. Setup Backend (Express)
echo "Setting up Backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!
echo "Backend started with PID $BACKEND_PID"
cd ..

# 3. Setup Frontend (Vite)
echo "Setting up Frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
echo "Frontend started with PID $FRONTEND_PID"
cd ..

echo "All services started!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo "ML Service: http://localhost:8000"
echo "Press Ctrl+C to stop all services."

# Trap Ctrl+C and kill background processes
trap "echo 'Stopping services...'; kill $ML_PID $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

wait
