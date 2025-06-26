require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Make sure you have this imported
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');



// Import the cron job to initialize it
require('./services/appointmentReminder');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// AI Endpoint
const { predictRisk } = require('./services/aiService'); // Make sure predictRisk is imported
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
// code initializes the Express server for the Cervical Cancer Platform.
// connects to the MongoDB database, sets up middleware for JSON parsing and CORS,
// and defines routes for authentication and patient management.
//  includes an AI endpoint for predicting cervical cancer risk based on patient data.
// The server listens on a specified port, defaulting to 5000 if not set in the environment variables.
// imports and initializes a cron job for appointment remindersss  