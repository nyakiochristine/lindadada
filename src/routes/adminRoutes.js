import express from 'express';
import { loginAdmin, getAggregates } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', loginAdmin);

// Protected route example (only for admin)
router.get('/aggregates', protectAdmin, getAggregates);

export default router;
