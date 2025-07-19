import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const clinicianSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //more fileds to be added here
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
clinicianSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
clinicianSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Clinician = mongoose.model('Clinician', clinicianSchema);
export default Clinician;
