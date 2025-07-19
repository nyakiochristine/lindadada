import { useAuth } from '../contexts/authContext';
import { useState, useEffect } from 'react';
import { fetchPatients } from '../Services/patientService';

export default function PatientsPage() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchPatients(user.token);
        setPatients(data.patients || []);
      } catch (err) {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, [user.token]);

  return (
    <div>
      <h2>All Patients</h2>
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Next Appointment</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.nextAppointment ? new Date(p.nextAppointment).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
