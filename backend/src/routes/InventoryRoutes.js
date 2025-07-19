import express from 'express';
import {
  addInventoryItem,
  getInventory,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/InventoryController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin adds inventory items
router.post('/', protectAdmin, addInventoryItem);

// Get all inventory items (open or admin only - adjust as needed)
router.get('/', protectAdmin, getInventory);

// Update inventory item
router.patch('/:id', protectAdmin, updateInventoryItem);

// Delete inventory item
router.delete('/:id', protectAdmin, deleteInventoryItem);

export default router;
//defines the inventory routes for managing inventory items in a Cervical Cancer Platform application.