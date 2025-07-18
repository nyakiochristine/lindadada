import express from 'express';
import { loginClinician, getClinicianDashboard } from '../controllers/clinicianController.js';
import { protectClinician } from '../middleware/auth.js';

const router = express.Router();

// Login route
router.post('/login', loginClinician);

// Protected example route
router.get('/dashboard', protectClinician, getClinicianDashboard);

export default router;
