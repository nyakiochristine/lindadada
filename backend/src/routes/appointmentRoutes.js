import express from 'express';
import {
  createAppointment,
  getAppointmentsByPatient,
  getAllAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { protectAdmin, protectClinician, protectPatient } from '../middleware/auth.js';

const router = express.Router();

// Patient creates appointment (or clinician/admin on behalf)
router.post('/', protectPatient, createAppointment);

// Patients get their appointments
router.get('/patient/:patientId', protectPatient, getAppointmentsByPatient);

// Clinicians/admin get all appointments
router.get('/', protectClinician, getAllAppointments);

// Update appointment status - admin/clinician only
router.patch('/:id/status', protectClinician, updateAppointmentStatus);

export default router;
