import { useState } from 'react';
import styled from 'styled-components';
import Card from '../List/Card';

const Main = () => {
    //^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))
    const defaultData = [
        {
            id: 1, // blog.id
            image: 'postImageURL.jpg', // blog.image
            title: '제목', // blog.title
            content: '글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 임시텍스트 글글 요약글 글 요약', // blog.contents
            date: '날짜', // blog.created_at 을 substring
            profilePic: 'profilePicURL.jpg', // user.profile_image
            writer: '작성자ID', // user.email 을 정규식으로 뒤에 제거한 displayname
            likes: '123' // blog.likes
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
        <StyledSection>
            <StyledUl>
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
            </StyledUl>
        </StyledSection>
    );
};

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: #9b9494;
    margin: 0 auto;
`;

const StyledUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
`;

export default Main;
