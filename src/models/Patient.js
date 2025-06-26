const mongoose = require('mongoose');

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

module.exports = mongoose.model('Patient', PatientSchema);
// This code defines a Mongoose schema for a Patient model in a MongoDB database.
// It includes fields for national ID, name, age, phone number, last screening date,
// HPV status, risk score, next appointment date, clinician reference, and createdAt timestamp.
