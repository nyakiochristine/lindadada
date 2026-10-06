import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { sendFollowupSMS } from '../Services/notificationService';
import { fetchPatients } from '../Services/patientService';

export default function SendFollowupPage() {
  const { user } = useAuth();
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchPatients(user.token).then(data => setPatients(data.patients || [])).catch(() => setMsg('Unable to load patients.')).finally(() => setLoadingPatients(false));
  }, [user.token]);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setSending(true);
    try {
      const result = await sendFollowupSMS({ patientId, date, token: user.token });
      setMsg(result.message);
      setPatientId('');
      setDate('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to send SMS');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <div className="page-heading"><div><h1>Send a follow-up</h1><p>Give patients a clear next step before their appointment.</p></div></div>
      <section className="content-panel">
        <h2>Appointment reminder</h2>
        <p>The patient will receive a text message with the selected date.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">Patient
            <select className="field-select" value={patientId} onChange={e => setPatientId(e.target.value)} required disabled={loadingPatients}>
              <option value="">{loadingPatients ? 'Loading patients...' : 'Select a patient'}</option>
              {patients.map(patient => <option value={patient._id} key={patient._id}>{patient.name} - {patient.nationalId}</option>)}
            </select>
          </label>
          <label className="form-field">Appointment date
            <input className="field-input" type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
          </label>
          <button className="button-primary" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send reminder'}</button>
          {msg && <div className={`form-message ${msg.includes('success') || msg.includes('sent') ? 'success' : 'error'}`} role="status">{msg}</div>}
        </form>
      </section>
    </div>
  );
}
// This component allows an admin to send follow-up appointment SMS to patients.