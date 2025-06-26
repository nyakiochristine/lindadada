const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  nationalId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  hpvStatus: { type: String, enum: ['positive', 'negative', 'unknown'] },
  screeningHistory: [{
    date: Date,
    result: String,
    facility: String
  }],
  riskScore: { type: Number, default: 0 },
  lastAppointment: Date,
  nextAppointment: Date,
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
// This code defines a Mongoose schema for a Patient model in a MongoDB database.
// It includes fields for national ID, age, HPV status, screening history, risk score,
// last and next appointment dates, and a reference to a clinic. The schema also