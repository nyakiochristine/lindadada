
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';


import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import clinicianRoutes from './routes/clinicianRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import inventoryRoutes from './routes/InventoryRoutes.js';  // note lowercase 'i'



// Import and initialize cron job (runs on import)
import './services/appointmentReminder.js';

import { predictRisk } from './services/aiService.js';

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
app.use('/api/clinicians', clinicianRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);

// AI Endpoint
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
// This code initializes the server for the Cervical Cancer Platform application.