// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Check if token exists — allow access, else redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
// component checks if the user is authenticated by verifying the presence of a token in localStorage.


