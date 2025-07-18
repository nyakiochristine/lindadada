import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true }, // e.g., packets, bottles, boxes
  description: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // who added/updated this
}, {
  timestamps: true,
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
// This code defines a Mongoose schema for an Inventory model in a MongoDB database.