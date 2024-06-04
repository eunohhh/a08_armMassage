import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBlogs from '../../hooks/useBlogs';

function LikeButton({ id }) {
    const { blogError, addLikes } = useBlogs();
    const { user } = useAuth();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLikeClick = async () => {
        setIsButtonDisabled(true);
        try {
            if (user) {
                const ids = {
                    blogId: id,
                    userId: user.id
                };

                addLikes(ids);
            } else {
                alert('로그인이 필요합니다');
            }
        } catch (error) {
            console.error('Failed to update likes: ', error);
        }
        setIsButtonDisabled(false);
    };

    useEffect(() => {
        if (blogError) {
            if (blogError === '이미 좋아요를 눌렀습니다') alert('이미 좋아요를 눌렀습니다');
        }
    }, [blogError]);

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
