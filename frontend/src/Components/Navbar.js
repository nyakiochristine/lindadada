import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import styles from './Navbar.module.css';  // Assuming you use CSS modules

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        <li>
          <NavLink 
            to="/"
            end  // exact match for root path
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/patients"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Patients
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/send-followup"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Send Follow-up SMS
          </NavLink>
        </li>
        <li>
          <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
