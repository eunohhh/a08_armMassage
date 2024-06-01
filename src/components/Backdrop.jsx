/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Backdrop({ children }) {
    return <StyledDiv>{children}</StyledDiv>;
}

export default Backdrop;
