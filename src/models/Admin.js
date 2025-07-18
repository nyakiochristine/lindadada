import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more admin fields if needed
});

// Password hash middleware
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password verification method
adminSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
    `Your follow-up appointment is scheduled for ${date.toLocaleDateString()}.`;
    // This code defines a Mongoose schema for an Admin model in a MongoDB database.}
    
      