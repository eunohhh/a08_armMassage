import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import JoinPage from '../pages/JoinPage';
import PersonalPage from '../pages/PersonalPage';
import WritePage from '../pages/WritePage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/my" element={<PersonalPage />} />
                <Route path="/write" element={<WritePage />} />
                <Route path="/detail" element={<DetailPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
