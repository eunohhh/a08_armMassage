import styled from 'styled-components';

function Loader() {
    return <StyledSpan></StyledSpan>;
}

export default Loader;

const StyledSpan = styled.span`
    position: relative;
    width: 48px;
    height: 48px;
    border: 5px solid black;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
