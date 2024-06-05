import { ModalProvider } from '@/contexts/modal.context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import JoinPage from '../pages/JoinPage';
import PersonalPage from '../pages/PersonalPage';
import WritePage from '../pages/WritePage';
import ProtectedRoute from './ProtectedRoute';
import MyListPage from '@/pages/MyListPage';

// / 메인 인수님
// /join 지훈님
// /my 도희님
// /write 현정님
// /detail 오은님

const Router = () => {
    return (
        <BrowserRouter>
            <ModalProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/join" element={<JoinPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/my" element={<PersonalPage />} />
                            <Route path="/write" element={<WritePage />} />
                        </Route>
                        <Route path="/detail/:id" element={<DetailPage />} />
                        <Route path="/mylist/:id" element={<MyListPage />} />
                    </Routes>
                </Layout>
            </ModalProvider>
        </BrowserRouter>
    );
};

export default Router;
