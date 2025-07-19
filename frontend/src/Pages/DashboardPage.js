import { useAuth } from '../contexts/authContext';
import { useEffect, useState } from 'react';
import { getAggregates } from '../Services/adminService';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [aggregates, setAggregates] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAggregates(user.token);
        setAggregates(data);
      } catch (err) {
        setAggregates({ message: "Could not load data" });
      }
    }
    fetchData();
  }, [user.token]);

  return (
    <div style={{padding: 20}}>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>
      <h2>Admin Dashboard</h2>
      <pre>{aggregates ? JSON.stringify(aggregates, null, 2) : "Loading..."}</pre>
    </div>
  );
}

