require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import and initialize cron job (runs on import)
require('./services/appointmentReminder');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admin', adminRoutes);

// AI Endpoint
const { predictRisk } = require('./services/aiService');
app.post('/api/predict', async (req, res) => {
  try {
    const patientData = req.body;
    const riskScore = await predictRisk(patientData);
    res.json({ riskScore });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to predict risk' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// This code initializes the Express server for the Cervical Cancer Platform.
// It sets up middleware for CORS and JSON parsing, connects to the MongoDB database,
// and defines routes for authentication and patient management.