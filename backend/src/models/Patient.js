import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  lastScreening: Date,
  hpvStatus: {
    type: String,
    enum: ['positive', 'negative', 'unknown']
  },
  riskScore: Number,
  nextAppointment: Date,
  clinician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
// This code defines a Mongoose schema for a Patient model in a MongoDB database.