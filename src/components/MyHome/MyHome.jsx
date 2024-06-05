import useBlogs from '../../hooks/useBlogs';
import MyWritingList from '../List/MyWritingList';
import styled from 'styled-components';
import Button from '../Elements/Button';

const MyHome = () => {
    const { blogs } = useBlogs();

    return (
        <StyledSection>
            <StyledProfile>
                <StyledProfilePic src={blogs.profilePic} alt="Profile 이미지 사진" />
                <StyledProfileBox>
                    <StyledProfileName>닉네임</StyledProfileName>
                    <Button type="button" buttonText="프로필 수정" color="#a055ff"></Button>
                </StyledProfileBox>
            </StyledProfile>
            <StyledUl>
                {blogs.map((blog) => (
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
    /* justify-content: space-between; */
    padding: 1rem 0rem;
    width: 60%;
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

const StyledProfileName = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;
const StyledUl = styled.ul`
    /* display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center; */
    margin-top: 100px;
`;
export default MyHome;
