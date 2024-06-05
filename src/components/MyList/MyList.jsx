import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBlogs from '../../hooks/useBlogs';
import Button from '../Elements/Button';
import MyWritingList from '../List/MyWritingList';

const MyList = () => {
    const navigate = useNavigate();
    const { blogs } = useBlogs();
    const { user, userInfo } = useAuth();
    const location = useLocation();
    const { email } = location.state;
    const [matchedUser, setMatchedUser] = useState(null);
    const [isCurrentLoggedInUser, setIsCurrentLoggedInUser] = useState(false);

    // console.log(matchedUser);
    // console.log(blogs);
    const onClickProfile = () => {
        console.log('개별 프로필로 이동');
        navigate('/my');
    };

    const filteredBlogs = blogs.filter((blog) => blog.user_id === email);
    useEffect(() => {
        if (userInfo) {
            const matchedUser = userInfo.find((user) => user.email === email);
            setMatchedUser(matchedUser);
        }
    }, [userInfo, email]);

    useEffect(() => {
        if (user) {
            if (user.email === email) {
                setIsCurrentLoggedInUser(true);
            }
        }
    }, [user, email]);

    return (
        <StyledSection>
            <StyledProfile>
                <StyledProfilePic src={matchedUser && matchedUser.profile_image} alt="Profile 이미지 사진" />
                <StyledProfileBox>
                    <StyledProfileName>{matchedUser && matchedUser.username}</StyledProfileName>
                    {isCurrentLoggedInUser && (
                        <StyledButton>
                            <Button
                                type="button"
                                buttonText="프로필 수정 (조건문으로안보이게)"
                                onClick={onClickProfile}
                                color="#a055ff"
                            ></Button>
                        </StyledButton>
                    )}
                </StyledProfileBox>
            </StyledProfile>
            <StyledUl>
                {filteredBlogs.map((blog) => (
                    <MyWritingList key={blog.id} blog={blog} />
                ))}
            </StyledUl>
        </StyledSection>
    );
};

const StyledSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0rem;
    width: 100%;
    height: 200px;
    border-bottom: 1px solid #d3d3d3;
`;

const StyledProfilePic = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: #b1b2e2;
    /* margin-right: 10px; */
`;

const StyledProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    margin-left: 2rem;
`;

const StyledButton = styled.div`
    margin-top: 0.3rem;
`;
const StyledProfileName = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
`;
const StyledUl = styled.ul`
    /* display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center; */
    width: 100%;
    margin-top: 100px;
`;
export default MyList;
