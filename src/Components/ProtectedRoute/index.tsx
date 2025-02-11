import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { user, token, loading } = useAuth();

    // Show a loading state while auth is being restored
    if (loading) {
        return <div>Loading...</div>;
    }

    return user && token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
