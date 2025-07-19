import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { sendFollowupSMS } from '../Services/notificationService';

export default function SendFollowupPage() {
  const { user } = useAuth();
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const result = await sendFollowupSMS({ patientId, date, token: user.token });
      setMsg(result.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to send SMS');
    }
  };

  return (
    <div>
      <h2>Send Follow-up SMS</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          placeholder="Patient ID"
          required
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit">Send SMS</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
// This component allows an admin to send follow-up appointment SMS to patients.