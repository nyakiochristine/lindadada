import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { loginPatient, registerPatient } from '../controllers/patientController.js';

const router = express.Router();

// Admin login route
router.post('/admin/login', loginAdmin);

// Patient login route
router.post('/patient/login', loginPatient);

// Patient registration route
router.post('/patient/register', registerPatient);

// (Optional) Add clinician or staff login/register routes similarly

export default router;
// This code defines the authentication routes for the Cervical Cancer Platform.



