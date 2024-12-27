import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Removed useNavigate as it's not needed here
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { user } = useAuth(); // Assuming `user` determines authentication status

    if (!user) {
        return <Navigate to="/signin" replace />; // Redirect to signin page if not authenticated
    }

    return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
