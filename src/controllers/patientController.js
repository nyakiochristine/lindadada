const Patient = require('../models/Patient');
const { predictRisk } = require('../services/aiService');
const { sendSMS } = require('../services/notificationService').default;

// Register new patient and calculate risk
exports.registerPatient = async (req, res) => {
  try {
    const { nationalId, name, age, hpvStatus, phone, clinician } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ nationalId });
    if (existingPatient) {
      return res.status(400).json({ error: 'Patient with this National ID already exists' });
    }

    // Calculate risk score
    const riskScore = await predictRisk({
      age,
      hpvStatus,
      screeningCount: 0 // You can extend this to actual screening count if available
    });

    // Create patient document
    const patient = new Patient({
      nationalId,
      name,
      age,
      hpvStatus,
      phone,
      clinician,
      riskScore
    });

    await patient.save();

    // Send initial SMS notification
    if (phone) {
      await sendSMS(phone, `Welcome to CervicalCare! Your initial risk score: ${riskScore.toFixed(2)}`);
    }

    res.status(201).json(patient);
  } catch (err) {
    console.error('Register Patient Error:', err);
    res.status(500).json({ error: 'Server error while registering patient' });
  }
};

// Schedule follow-up appointment
exports.scheduleFollowUp = async (req, res) => {
  try {
    const { patientId, date } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    patient.nextAppointment = new Date(date);
    await patient.save();

    // Send appointment confirmation SMS
    if (patient.phone) {
      await sendSMS(patient.phone, 
        `Appointment scheduled for ${patient.nextAppointment.toLocaleString()}. Reply YES to confirm, NO to reschedule.`);
    }

    res.json(patient);
  } catch (err) {
    console.error('Schedule Follow-up Error:', err);
    res.status(500).json({ error: 'Server error while scheduling follow-up' });
  }
};

// Get patients with high risk score
exports.getHighRiskPatients = async (req, res) => {
  try {
    const threshold = 0.7; // Define your risk threshold here

    const highRiskPatients = await Patient.find({ riskScore: { $gt: threshold } })
      .populate('clinician', 'name email') // Populate clinician info if linked
      .select('-__v'); // Exclude internal fields if desired

    res.json(highRiskPatients);
  } catch (err) {
    console.error('Get High Risk Patients Error:', err);
    res.status(500).json({ error: 'Server error while fetching high-risk patients' });
  }
};
// This code defines the patient controller for the Cervical Cancer Platform.
// It includes functions for registering new patients, scheduling follow-up appointments,
// and retrieving high-risk patients based on their risk scores.
// The `registerPatient` function calculates the risk score using an AI service and sends an SMS
// notification to the patient upon registration.
