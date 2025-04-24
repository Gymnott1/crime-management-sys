import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation(); // Get current location

    if (loading) {
        // Optional: Show a loading spinner or placeholder while checking auth
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Redirect them to the / page (login/signup), but save the current location they were
        // trying to go to. This allows us to send them back after login. (Optional enhancement)
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children; // Render the child component if authenticated
}

export default ProtectedRoute;