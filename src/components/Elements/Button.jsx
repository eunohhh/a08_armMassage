import styled from 'styled-components';

// onClick 기본값 null
// margin top 0
const Button = ({ buttonText, color, type, onClick = null }) => {
    return (
        <StyledButton type={type} color={color} onClick={onClick}>
            {buttonText}
        </StyledButton>
    );
};
const StyledButton = styled.button`
    padding: 8px 20px;
    height: 34px;
    /* margin-top: 10px; */
    background-color: ${(props) => props.color};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out 0s;
    &:hover {
        background-color: #d2d2d2;
        color: #3f3f3f;
    }
`;
export default Button;
