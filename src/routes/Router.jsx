import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"></Route>
                <Route path="/join"></Route>
                <Route path="/my"></Route>
                <Route path="/write"></Route>
                <Route path="/detail"></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
