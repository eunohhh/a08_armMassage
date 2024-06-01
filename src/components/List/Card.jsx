import styled from 'styled-components';

const Card = ({ image, title, content, date, profilePic, writer, likes }) => {
    return (
        <StyledCardContainer>
            <StyledImage>
                <img src={image} alt="post" />
            </StyledImage>
            <StyledContent>
                <StyledTitle>{title}</StyledTitle>
                <StyledText>{content}</StyledText>
                <StyledDate>{date}</StyledDate>
            </StyledContent>
            <StyledInfo>
                <StyledProfile>
                    <StyledProfilePic src={profilePic} alt="profile" />
                    <StyledWriter>{writer}</StyledWriter>
                </StyledProfile>
                <StyledLikesContainer>
                    <StyledLikes>❤️ {likes}</StyledLikes>
                </StyledLikesContainer>
            </StyledInfo>
        </StyledCardContainer>
    );
};

const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    height: 400px;
`;

const StyledImage = styled.div`
    flex: 4;
    background-color: #f0f0f0;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledContent = styled.div`
    flex: 4;
    background-color: #e8e8e8;
    padding: 10px;
    font-size: 14px;
    overflow: hidden;
`;

const StyledTitle = styled.h2`
    margin: 0 0 20px 0;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledText = styled.p`
    margin: 10px 0 80px 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledDate = styled.div`
    font-size: 12px;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
`;

const StyledProfilePic = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const StyledWriter = styled.div`
    font-weight: bold;
`;

const StyledLikesContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLikes = styled.div`
    margin-left: 10px;
`;

export default Card;
