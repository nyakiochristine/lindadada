import Admin from '../models/Admin.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import Inventory from '../models/Inventory.js';
import jwt from 'jsonwebtoken';
import { sendSMS } from '../services/notificationService.js';

// LOGIN
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ADMIN DASHBOARD AGGREGATES (stub)
export const getAggregates = async (req, res) => {
  try {
    const now = new Date();
    const [totalPatients, highRiskPatients, upcomingAppointments, lowStockItems] = await Promise.all([
      Patient.countDocuments(),
      Patient.countDocuments({ riskScore: { $gte: 0.7 } }),
      Appointment.countDocuments({ date: { $gte: now }, status: 'Scheduled' }),
      Inventory.countDocuments({ quantity: { $lte: 10 } }),
    ]);

    res.json({ totalPatients, highRiskPatients, upcomingAppointments, lowStockItems });
  } catch (error) {
    console.error('Get Admin Aggregates Error:', error);
    res.status(500).json({ message: 'Unable to load dashboard metrics' });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .select('name nationalId phone riskScore nextAppointment hpvStatus lastScreening')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ patients });
  } catch (error) {
    console.error('Get Patients Error:', error);
    res.status(500).json({ message: 'Unable to load patients' });
  }
};

// SEND FOLLOW-UP APPOINTMENT SMS TO PATIENT
export const sendFollowUpSMS = async (req, res) => {
  
  const { patientId, date } = req.body;

  if (!patientId || !date) {
    return res.status(400).json({ message: 'patientId and date are required' });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.phone) {
      return res.status(400).json({ message: 'Patient phone number not available' });
    }

    const appointmentDate = new Date(date);
    if (Number.isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: 'Please provide a valid appointment date' });
    }
    const message = `Your follow-up appointment is scheduled for ${appointmentDate.toLocaleDateString()}.`;

    await sendSMS(patient.phone, message);

    res.json({ message: 'SMS notification sent successfully' });
  } catch (error) {
    console.error('Error sending follow-up SMS:', error);
    res.status(500).json({ message: error.message });
  }
};
