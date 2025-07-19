import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../Services/authService';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(username, password); 
      
      // Save user data
      login({ 
        username: data.username || username,
        token: data.token,
      });

      setMsg('Login successful');

      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setMsg('Login failed: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
