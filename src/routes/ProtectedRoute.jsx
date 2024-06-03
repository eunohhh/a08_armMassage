import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
