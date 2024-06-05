import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))/g;

const removeImgTags = (htmlString) => {
    return htmlString.replace(/<img[^>]*>/gi, '');
};

const Card = ({ blog }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        console.log('개별 글 페이지로 이동');
        navigate(`/detail/${blog.id}`, { state: { blog } });
    };

    const onClickProfile = () => {
        console.log('개별 프로필로 이동');
        navigate(`/mylist/${blog.id}`, { state: { email: blog.user_id } });
    };

    const dateFormat = (date) => date.slice(0, 10);

    const idFormat = (id) => {
        const email = id.split('@');
        return email[0];
    };

    return (
        <StyledLi>
            <StyledCardContainer>
                <StyledImage onClick={handleCardClick} $src={`${blog.image}`} alt="post 타이틀 이미지" />
                <StyledContent>
                    <StyledTexts>
                        <StyledTitle onClick={handleCardClick}>{blog.title}</StyledTitle>
                        <StyledText
                            onClick={handleCardClick}
                            dangerouslySetInnerHTML={{ __html: removeImgTags(blog.contents) }}
                        ></StyledText>
                    </StyledTexts>
                    <StyledDate>{dateFormat(blog.created_at)}</StyledDate>
                </StyledContent>
                <StyledInfo>
                    <StyledProfile onClick={onClickProfile}>
                        <StyledProfilePic src={blog.profilePic} alt="Profile 이미지 사진" />
                        <StyledWriter>{idFormat(blog.user_id)}</StyledWriter>
                    </StyledProfile>
                    <StyledLikesContainer>
                        <StyledLikes>❤️ {blog.likes}</StyledLikes>
                    </StyledLikesContainer>
                </StyledInfo>
            </StyledCardContainer>
        </StyledLi>
    );
};

const StyledLi = styled.li`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    height: 400px;
    max-width: 280px;
`;

const StyledImage = styled.div`
    flex: 8;
    background-image: url(${(props) => "'" + props.$src + "'"});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;

    ${(props) =>
        !props.$src &&
        `
        flex: 0;
        display: none;
    `}
`;

const StyledContent = styled.div`
    flex: ${(props) => (props.src ? 4 : 7)};
    background-color: #e8e8e8;
    padding: 10px;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    display: flex;
`;
const StyledTexts = styled.div`
    flex: 1;
`;

const StyledTitle = styled.h3`
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`;

const StyledText = styled.p`
    margin: 10px 0 10px 0;
    font-size: 14px;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 1.6;
`;

const StyledDate = styled.div`
    font-size: 12px;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 10px;
    left: 10px;
`;

const StyledInfo = styled.div`
    flex: 1;
    background-color: #d0d0d0;
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
`;

const StyledProfile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledProfilePic = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const StyledWriter = styled.div`
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledLikesContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLikes = styled.div`
    margin-left: 10px;
`;

export default Card;
