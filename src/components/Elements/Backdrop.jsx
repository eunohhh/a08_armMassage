import styled from 'styled-components';
import { useModal } from '../../contexts/modal.context';

const StyledDiv = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Backdrop({ children }) {
    const modal = useModal();

    const handleBackdropClick = (e) => {
        if (e.target.id === 'backdrop') {
            modal.close();
        }
    };

    return (
        <StyledDiv id="backdrop" onClick={handleBackdropClick}>
            {children}
        </StyledDiv>
    );
}

export default Backdrop;
