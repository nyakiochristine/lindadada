import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../Services/authService';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const data = await loginAdmin(username, password); 
      
      // Save user data
      login({ 
        username: data.username || username,
        token: data.token,
      });

      navigate('/');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'We could not sign you in. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-mark">L</div>
        <h1>Welcome back</h1>
        <p>Sign in to coordinate patient care.</p>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">Username
        <input className="field-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        </label>
        <label className="form-field">Password
        <input className="field-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        </label>
        <button className="button-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      {msg && <div className="form-message error" role="alert">{msg}</div>}
      </section>
    </main>
  );
}
