import supabase from '@/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        fetchSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return session ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
