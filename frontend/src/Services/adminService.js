import axios from 'axios';

export const getAggregates = async (token) => {
  const response = await axios.get('/api/admin/aggregates', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};


