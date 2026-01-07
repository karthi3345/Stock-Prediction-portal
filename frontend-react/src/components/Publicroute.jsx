import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext); // fixed typo

    // If NOT logged in, show the page (children)
    // Otherwise, redirect to dashboard
    
    return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
