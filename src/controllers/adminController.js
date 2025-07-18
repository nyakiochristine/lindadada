import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

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

// Example: GET ADMIN DASHBOARD AGGREGATES
export const getAggregates = async (req, res) => {
  // Replace with your real aggregation logic
  res.json({ message: 'Aggregated admin data' });
};
    await sendSMS(patient.phone, `Your follow-up appointment is scheduled for ${date.toLocaleDateString()}.`);

                                                                                                                 