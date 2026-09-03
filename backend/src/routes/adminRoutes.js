import express from 'express';
import { loginAdmin, getAggregates, getPatients, sendFollowUpSMS } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', loginAdmin);

// Protected route example (only for admin)
router.get('/aggregates', protectAdmin, getAggregates);
router.get('/patients', protectAdmin, getPatients);
router.post('/send-followup-sms', protectAdmin, sendFollowUpSMS);

export default router;
// This code defines the admin routes for the Cervical Cancer Platform.