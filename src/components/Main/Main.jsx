import styled from 'styled-components';
import Card from '../List/Card';
import useBlogs from '../../hooks/useBlogs';

const Main = () => {
    const { blogs } = useBlogs();
    // console.log(blogs);

    return (
        <StyledSection>
            <StyledUl>
                {blogs.map((post) => (
                    <Card
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title}
                        content={post.contents.match(/<p>(.*?)<\/p>/)?.[1]}
                        date={post.created_at}
                        profilePic={post.profilePic}
                        writer={post.nick_name}
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
