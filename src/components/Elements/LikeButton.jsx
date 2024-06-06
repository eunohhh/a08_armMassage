import useAuth from '@/hooks/useAuth';
import { getBlogs, updateLikes } from '@/redux/blogs.slice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

function LikeButton({ id }) {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [localError, setLocalError] = useState(null);

    const handleLikeClick = async () => {
        setIsButtonDisabled(true);
        try {
            if (user) {
                const ids = {
                    blogId: id,
                    userId: user.id
                };

                await dispatch(updateLikes(ids)).unwrap();
                await dispatch(getBlogs()).unwrap();
            } else {
                alert('로그인이 필요합니다');
            }
        } catch (error) {
            console.error('Failed to update likes: ', error);
            setLocalError(error.message);
        }
        setIsButtonDisabled(false);
    };

    useEffect(() => {
        if (localError) {
            if (localError === '이미 좋아요를 눌렀습니다' || localError === 'Rejected') {
                alert('이미 좋아요를 눌렀습니다');
                setLocalError(null);
            }
        }
    }, [localError]);

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
