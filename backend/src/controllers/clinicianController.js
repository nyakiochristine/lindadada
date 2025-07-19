import Clinician from '../models/Clinician.js';
import jwt from 'jsonwebtoken';

// Clinician login
export const loginClinician = async (req, res) => {
  const { username, password } = req.body;
  try {
    const clinician = await Clinician.findOne({ username });
    if (!clinician || !(await clinician.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: clinician._id, role: 'clinician' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, username: clinician.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Example protected route
export const getClinicianDashboard = async (req, res) => {
  res.json({ message: `Welcome clinician ${req.clinician.username}` });
};
// defines a controller for clinician login and dashboard access in a Cervical Cancer Platform application.