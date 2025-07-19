import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Hide navbar if not logged in

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li>
          <Link to="/" style={styles.link}>Dashboard</Link>
        </li>
        <li>
          <Link to="/patients" style={styles.link}>Patients</Link>
        </li>
        <li>
          <Link to="/send-followup" style={styles.link}>Send Follow-up SMS</Link>
        </li>
        <li>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#222',
    padding: '1rem',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
