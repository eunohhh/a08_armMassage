import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const removeImgTags = (htmlString) => {
    return htmlString.replace(/<img[^>]*>/gi, '');
};
const MyWritingList = ({ blog }) => {
    const navigate = useNavigate();
    const dateFormat = (date) => date.slice(0, 10);

    const onClickDetail = () => {
        console.log('개별 글 페이지로 이동');
        navigate(`/detail/${blog.id}`, { state: { blog } });
    };

    return (
        <StyledLi>
            <StyledPostContainer>
                <StyledImage onClick={onClickDetail} $src={`${blog.image}`} alt="Post title Image" />

                <StyledContent>
                    <StyledTitle onClick={onClickDetail}>{blog.title}</StyledTitle>
                    <StyledText dangerouslySetInnerHTML={{ __html: removeImgTags(blog.contents) }}></StyledText>
                    <StyledDate>{dateFormat(blog.created_at)}</StyledDate>
                    <StyledLikes>❤️ {blog.likes}</StyledLikes>
                </StyledContent>
            </StyledPostContainer>
        </StyledLi>
    );
};

const StyledLi = styled.li`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: #dffaeb; */
    /* border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    overflow: hidden;
    margin-bottom: 10rem;
    width: 100%;
    height: 50rem;
    border-bottom: 1px solid #d3d3d3;
`;

const StyledImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => "'" + props.$src + "'"});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;

const StyledContent = styled.div`
    /* flex: 1; */
    /* padding: 50px; */
    margin-top: 30px;
    height: 60%;
`;

const StyledTitle = styled.h2`
    font-size: 38px;
    font-weight: bold;
    /* margin-bottom: 30px; */
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 25%;
    cursor: pointer;
`;

const StyledText = styled.p`
    font-size: 24px;
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    height: 37%;
`;

const StyledDate = styled.div`
    font-size: 22px;
    color: #999;
    margin-top: 10px;
    height: 13%;
`;

const StyledLikes = styled.div`
    font-size: 28px;
    color: #999;
    /* margin-top: 10px; */
    height: 10%;
`;

export default MyWritingList;
