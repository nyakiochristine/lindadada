import { useAuth } from '../contexts/authContext';
import { useEffect, useState } from 'react';
import { getAggregates } from '../Services/adminService';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const [aggregates, setAggregates] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Pass user.token from context
        const data = await getAggregates(user.token);
        setAggregates(data);
      } catch (err) {
        setError('We could not load the latest metrics. Try refreshing the page.');
      }
    }
    if (user && user.token) fetchData();
  }, [user]);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Good morning, {user?.username}</h1>
          <p>A clear view of today&apos;s patient care work.</p>
        </div>
        <Link className="button-primary" to="/send-followup">Schedule follow-up</Link>
      </div>
      {error && <div className="form-message error">{error}</div>}
      <section className="metric-grid" aria-label="Practice metrics">
        <article className="metric-card"><span>Total patients</span><strong>{aggregates?.totalPatients ?? '—'}</strong></article>
        <article className="metric-card warning"><span>High-risk patients</span><strong>{aggregates?.highRiskPatients ?? '—'}</strong></article>
        <article className="metric-card accent"><span>Upcoming appointments</span><strong>{aggregates?.upcomingAppointments ?? '—'}</strong></article>
        <article className="metric-card"><span>Items to reorder</span><strong>{aggregates?.lowStockItems ?? '—'}</strong></article>
      </section>
      <section className="content-panel">
        <h2>Keep care moving</h2>
        <p>Review patient records or send a timely appointment reminder from the tools below.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <Link className="button-secondary" to="/patients">View patient records</Link>
          <Link className="button-secondary" to="/send-followup">Send a reminder</Link>
        </div>
      </section>
    </div>
  );
}




