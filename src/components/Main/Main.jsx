import { useState } from 'react';
import styled from 'styled-components';
import Card from '../List/Card';

const Main = () => {
    const defaultData = [
        {
            id: 1,
            image: 'postImageURL.jpg',
            title: '제목',
            content: '글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약',
            date: '날짜',
            profilePic: 'profilePicURL.jpg',
            writer: '작성자ID',
            likes: '123'
        },
        {
            id: 2,
            image: 'postImageURL.jpg',
            title: '제목22',
            content: '글 222임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약',
            date: '22날짜',
            profilePic: '22profilePicURL.jpg',
            writer: '22작성자ID',
            likes: '23'
        },
        {
            id: 3,
            image: 'postImageURL.jpg',
            title: '333제목33',
            content: '333글 222임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약',
            date: '333날짜',
            profilePic: '333profilePicURL.jpg',
            writer: '333작성자ID',
            likes: '333'
        },
        {
            id: 4,
            image: 'postImageURL.jpg',
            title: '4제목33',
            content: '4 222임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약',
            date: '44날짜',
            profilePic: '44profilePicURL.jpg',
            writer: '4작성자ID',
            likes: '4'
        },
        {
            id: 5,
            image: 'postImageURL.jpg',
            title: '5제목33',
            content: '5글 25임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약',
            date: '5날짜',
            profilePic: '333profilePicURL.jpg',
            writer: '55작성자ID',
            likes: '53'
        }
    ];

    const [posts, setPosts] = useState(defaultData);

    return (
        <StyledMain>
            <StyledMainInner>
                {posts.map((post) => (
                    <Card
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title}
                        content={post.content}
                        date={post.date}
                        profilePic={post.profilePic}
                        writer={post.writer}
                        likes={post.likes}
                    />
                ))}
            </StyledMainInner>
        </StyledMain>
    );
};

const StyledMain = styled.main`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: #9b9494;
`;

const StyledMainInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
`;

export default Main;
