import styled from 'styled-components';
import BlogTest from '../test/blogTest';
import Header from './Header/Header';

function Layout({ children }) {
    return (
        <>
            <Header />
            <StyledMain>{children}</StyledMain>
            <BlogTest />
        </>
    );
}

export default Layout;

const StyledMain = styled.main`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;
