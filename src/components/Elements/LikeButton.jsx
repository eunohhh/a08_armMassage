import { useState } from 'react';
import styled from 'styled-components';
import useBlogs from '../../hooks/useBlogs';

function LikeButton({ id }) {
    const { addLikes } = useBlogs();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLikeClick = async () => {
        setIsButtonDisabled(true);
        try {
            await addLikes(id).unwrap();
        } catch (error) {
            console.error('Failed to update likes: ', error);
        }
        setIsButtonDisabled(false);
    };

    return (
        <StyledButton onClick={handleLikeClick} disabled={isButtonDisabled}>
            ❤️
        </StyledButton>
    );
}

export default LikeButton;

const StyledButton = styled.button`
    display: inline;
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
`;
