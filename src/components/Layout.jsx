import styled from 'styled-components';
import Header from './Header/Header';

function Layout({ children }) {
    return (
        <>
            <Header />
            <StyledMain>{children}</StyledMain>
        </>
    );
}

export default Layout;

const StyledMain = styled.main`
    max-width: 1600px;
    min-height: calc(100vh - 72px);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
