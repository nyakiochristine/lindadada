import { useState } from 'react';
import { loginAdmin } from '../Services/authService';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(username, password);
      setMsg('Login successful');
      // Store JWT, redirect, or set context state here
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
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
