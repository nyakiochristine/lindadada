import Patient from '../models/Patient.js';
import { predictRisk } from '../services/aiService.js';
import sendSMS from '../services/notificationService.js';

// Register new patient and calculate risk
export const registerPatient = async (req, res) => {
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
      screeningCount: 0 // extend as needed
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
export const scheduleFollowUp = async (req, res) => {
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

// Get high-risk patients
export const getHighRiskPatients = async (req, res) => {
  try {
    const threshold = 0.7; // risk threshold

    const highRiskPatients = await Patient.find({ riskScore: { $gt: threshold } })
      .populate('clinician', 'name email')
      .select('-__v');

    res.json(highRiskPatients);
  } catch (err) {
    console.error('Get High Risk Patients Error:', err);
    res.status(500).json({ error: 'Server error while fetching high-risk patients' });
  }
};

// Get logged-in patient profile
export const getPatientProfile = async (req, res) => {
  try {
    // Assumes req.patient._id is set by auth middleware
    const patientId = req.patient._id;

    const patient = await Patient.findById(patientId).select('-__v -password');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    console.error('Get Patient Profile Error:', err);
    res.status(500).json({ error: 'Server error while fetching patient profile' });
  }
};

// (Example) Patient login function (implement as needed)
export const loginPatient = async (req, res) => {
  // Implement login logic, e.g., verify credentials, generate JWT
  res.status(501).json({ message: 'loginPatient not implemented' });
};
