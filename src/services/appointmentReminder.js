const cron = require('node-cron');
const Patient = require('../models/Patient');
const { sendSMS } = require('./notificationService');

cron.schedule('0 8 * * *', async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Start and end of tomorrow
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

    const patients = await Patient.find({
      nextAppointment: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    for (const patient of patients) {
      if (patient.phone) {
        await sendSMS(patient.phone, 
          `Reminder: Your appointment is scheduled for tomorrow at ${patient.nextAppointment.toLocaleString()}`);
      }
    }

    console.log(`Sent reminders to ${patients.length} patients.`);
  } catch (error) {
    console.error('Error sending appointment reminders:', error);
  }
});
