import { useAuth } from '../contexts/authContext';
import { useState, useEffect } from 'react';
import { fetchPatients } from '../Services/patientService';

export default function PatientsPage() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchPatients(user.token);
        setPatients(data.patients || []);
      } catch (err) {
        setPatients([]);
        setError('We could not load patient records. Try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, [user.token]);

  return (
    <div className="page">
      <div className="page-heading">
        <div><h1>Patient records</h1><p>Find a patient and keep follow-up care on track.</p></div>
      </div>
      {error && <div className="form-message error">{error}</div>}
      <section className="content-panel">
        <div className="toolbar">
          <h2>All patients</h2>
          <input className="field-input search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or ID" aria-label="Search patients" />
        </div>
      {loading ? (
        <div className="empty-state">Loading patient records...</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Next Appointment</th>
            </tr>
          </thead>
          <tbody>
            {patients.filter((patient) => `${patient.name} ${patient.nationalId}`.toLowerCase().includes(query.toLowerCase())).map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.nationalId}</td>
                <td>{p.phone}</td>
                <td><span className={`status ${p.riskScore >= 0.7 ? 'high' : 'standard'}`}>{p.riskScore >= 0.7 ? 'High risk' : 'Standard'}</span></td>
                <td>{p.nextAppointment ? new Date(p.nextAppointment).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && patients.length === 0 && <div className="empty-state">No patient records yet.</div>}
      </section>
    </div>
  );
}
