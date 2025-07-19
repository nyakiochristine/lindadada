import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';  // adjust path if needed
import bcrypt from 'bcryptjs';

dotenv.config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cervical_care');

    const username = 'admin'; 
    const newPassword = 'Bistro*254'; 
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin user's password
    const result = await Admin.findOneAndUpdate(
      { username },
      { password: hashedPassword }
    );

    if (result) {
      console.log(`Password for '${username}' reset successfully!`);
    } else {
      console.log(`Admin user '${username}' not found.`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error resetting password:', error);
  }
}

resetPassword();
