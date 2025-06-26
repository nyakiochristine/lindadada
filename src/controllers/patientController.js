const Patient = require('../models/Patient');
const { predictRisk } = require('../services/aiService');
const { sendSMS } = require('../services/notificationService').default;

// Register new patient and calculate risk
exports.registerPatient = async (req, res) => {
  try {
    const { nationalId, age, hpvStatus, phone } = req.body;
    
    // Create patient
    const patient = new Patient({
      nationalId,
      age,
      hpvStatus,
      phone
    });

    // Calculate risk score
    patient.riskScore = await predictRisk({
      age,
      hpvStatus,
      screeningCount: 0
    });

    // Save patient
    await patient.save();

    // Send initial notification
    await sendSMS(phone, `Welcome to CervicalCare! Your initial risk score: ${patient.riskScore}`);

    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Schedule follow-up
exports.scheduleFollowUp = async (req, res) => {
  try {
    const { patientId, date } = req.body;
    const patient = await Patient.findById(patientId);
    
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    
    patient.nextAppointment = new Date(date);
    await patient.save();
    
    // Send confirmation
    await sendSMS(patient.phone, 
      `Appointment scheduled: ${date}. Reply YES to confirm, NO to reschedule`);
    
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get high-risk patients
exports.getHighRiskPatients = async (req, res) => {
  try {
    const highRiskPatients = await Patient.find({ riskScore: { $gt: 0.7 } })
      .populate('clinicId', 'name location');
    
    res.json(highRiskPatients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}