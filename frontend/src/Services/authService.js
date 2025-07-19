import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function loginAdmin(username, password) {
  const response = await axios.post(`${API_BASE_URL}/api/admin/login`, { username, password });
  return response.data;
}
