import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function getAggregates(token) {
  const response = await axios.get(`${API_BASE_URL}/api/admin/aggregates`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


