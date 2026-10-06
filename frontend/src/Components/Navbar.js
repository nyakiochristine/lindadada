import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <NavLink to="/" end className={styles.brand}>Lindadada</NavLink>
      <ul className={styles.navlist}>
        <li>
          <NavLink 
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Overview
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
            Follow-ups
          </NavLink>
        </li>
        <li>
          <button className={styles.logoutButton} onClick={logout}>Sign out</button>
        </li>
      </ul>
    </nav>
  );
}
