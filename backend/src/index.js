const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/env');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import Routes
const authRoutes = require('./routes/auth');
const detectionRoutes = require('./routes/detection');
const weatherRoutes = require('./routes/weather');
const riskRoutes = require('./routes/risk');
const advisoryRoutes = require('./routes/advisory');
const alertsRoutes = require('./routes/alerts');
const mapRoutes = require('./routes/map');
const expertRoutes = require('./routes/expert');
const followUpRoutes = require('./routes/follow-up');

const app = express();

// Middleware
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/detection', detectionRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/follow-up', followUpRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(config.PORT, () => {
  console.log(`[Backend] Server running on port ${config.PORT} in ${config.NODE_ENV} mode`);
  console.log(`[Backend] Mock DB enabled: ${config.USE_MOCK_DB}`);
});
