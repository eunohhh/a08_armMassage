import styled from "styled-components";

const Card = ({
    id,
    image,
    title,
    content,
    date,
    profilePic,
    writer,
    likes,
}) => {
    const onClickImage = () => {
        console.log("개별 글 페이지로 이동");
    };

    const onClickTitle = () => {
        console.log("개별 글 페이지로 이동");
    };

    const onClickText = () => {
        console.log("개별 글 페이지로 이동");
    };

    const onClickProfile = () => {
        console.log("개별 프로필로 이동");
    };

    return (
        <StyledCardContainer>
            <StyledImage
                onClick={onClickImage}
                src={image}
                alt="post 타이틀 이미지"
            >
                이미지
            </StyledImage>
            <StyledContent>
                <StyledTitle onClick={onClickTitle}>{title}</StyledTitle>
                <StyledText onClick={onClickText}>{content}</StyledText>
                <StyledDate>{date}</StyledDate>
            </StyledContent>
            <StyledInfo>
                <StyledProfile onClick={onClickProfile}>
                    <StyledProfilePic
                        src={profilePic}
                        alt="Profile 이미지 사진"
                    />
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
    cursor: pointer;
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
    cursor: pointer;
`;

const StyledText = styled.p`
    margin: 10px 0 80px 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
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
`;

const StyledLikesContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLikes = styled.div`
    margin-left: 10px;
`;

export default Card;
