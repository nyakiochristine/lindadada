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

        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
  <Route element={<ProtectedRoute />}></Route>
        <Route path="/" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/patients" element={user ? <PatientsPage /> : <Navigate to="/login" />} />
        <Route path="/send-followup" element={user ? <SendFollowupPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
// our main entry point of the application, setting up routes and navigation based on authentication status.