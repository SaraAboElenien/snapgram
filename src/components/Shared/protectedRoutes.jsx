import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '@/Context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { userToken, userData, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!userToken || !userData) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
