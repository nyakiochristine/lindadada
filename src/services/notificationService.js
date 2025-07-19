import axios from 'axios';

/**
 * Sends an SMS message using Africa's Talking API.
 * @param {string} phone - Recipient phone number in international format (e.g., +2547XXXXXXXX).
 * @param {string} message - The SMS message content.
 */
export const sendSMS = async (phone, message) => {
  try {
    // Prepare form-urlencoded payload
    const params = new URLSearchParams();
    params.append('username', process.env.AT_USERNAME);
    params.append('to', phone);
    params.append('message', message);
    params.append('from', 'CERVICAL-CARE');

    const response = await axios.post(
      'https://api.africastalking.com/version1/messaging',
      params.toString(),
      {
        headers: {
          'ApiKey': process.env.AT_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log(`SMS sent successfully to ${phone}`, response.data);
  } catch (err) {
    if (err.response) {
      console.error('SMS API Error:', err.response.data);
    } else {
      console.error('SMS Error:', err.message);
    }
  }
};

    