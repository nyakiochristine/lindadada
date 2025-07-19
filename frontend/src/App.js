import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import PatientsPage from './Pages/PatientsPage';
import SendFollowupPage from './Pages/SendFollowupPage';
import { useAuth } from './contexts/authContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />}

      <Routes>
        {/* Public login route */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/send-followup" element={<SendFollowupPage />} />
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

