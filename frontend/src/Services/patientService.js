import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchPatients(token) {
  const response = await axios.get(`${API_BASE_URL}/api/patients`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
