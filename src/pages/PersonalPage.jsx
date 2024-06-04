import MyPage from '@/components/My/MyPage';
import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

function PersonalPage() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" />;
    return <MyPage />;
}

export default PersonalPage;
