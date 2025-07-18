import Inventory from '../models/Inventory.js';

// Add new inventory item
export const addInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, unit, description } = req.body;
    const newItem = new Inventory({ itemName, quantity, unit, description, addedBy: req.admin._id });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().exec();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update inventory item quantity or details
export const updateInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, unit, description } = req.body;
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    if (itemName) item.itemName = itemName;
    if (quantity !== undefined) item.quantity = quantity;
    if (unit) item.unit = unit;
    if (description) item.description = description;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete inventory item (admin only)
export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// defines a controller for managing inventory items in a Cervical Cancer Platform application.