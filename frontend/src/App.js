import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import { useAuth } from './contexts/authContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/" 
          element={user ? <DashboardPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;


