import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Clinician from '../models/Clinician.js';
import Patient from '../models/Patient.js';

<<<<<<< HEAD



=======
>>>>>>> 1fbaa4e7b2dbca5d1de16c1bf0d6718db5d2df7d
/**
 * Helper function to get token from header and verify it
 */
const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return null;
  }
};

/**
 * Middleware to protect Admin routes
 */
export const protectAdmin = async (req, res, next) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Middleware to protect Clinician routes
 */
export const protectClinician = async (req, res, next) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const clinician = await Clinician.findById(decoded.id);
    if (!clinician) {
      return res.status(403).json({ message: 'Forbidden: Clinician access only' });
    }
    req.clinician = clinician;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Middleware to protect Patient routes
 */
export const protectPatient = async (req, res, next) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const patient = await Patient.findById(decoded.id);
    if (!patient) {
      return res.status(403).json({ message: 'Forbidden: Patient access only' });
    }
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
