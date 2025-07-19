import React, { useEffect, useState } from 'react';
import api from './api';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/admin/aggregates') // or your protected endpoint
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
