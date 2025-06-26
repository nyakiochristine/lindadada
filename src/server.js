require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

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
app.post('/api/predict', async (req, res) => {
  const patientData = req.body;
  const riskScore = await predictRisk(patientData);
  res.json({ riskScore });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// This code initializes an Express server for the Cervical Cancer Platform.
// It connects to a MongoDB database, sets up middleware for JSON parsing and CORS,
// and defines routes for authentication and patient management.
// It also includes an AI endpoint for predicting cervical cancer risk based on patient data.