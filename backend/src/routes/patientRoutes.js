import express from 'express';
import {
  registerPatient,
  loginPatient,
  getHighRiskPatients,
  scheduleFollowUp
} from '../controllers/patientController.js';
import { getPatientProfile} from '../controllers/patientController.js';
import { protectPatient } from '../middleware/auth.js';



const router = express.Router();


router.get('/profile', protectPatient, getPatientProfile);




// Patient registration route (public)
router.post('/register', registerPatient);

// Patient login route (public)
router.post('/login', loginPatient);

// Get logged-in patient profile (protected)
router.get('/profile', protectPatient, getPatientProfile);



export default router;
// This code defines the patient routes for managing patient-related operations in a Cervical Cancer Platform application.