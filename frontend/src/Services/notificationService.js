import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function sendFollowupSMS({ patientId, date, token }) {
  const response = await axios.post(
    `${API_BASE_URL}/api/admin/send-followup-sms`,
    { patientId, date },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
