import styled from 'styled-components';
import useBlogs from '../../hooks/useBlogs';
import Card from '../List/Card';

const Main = () => {
    const { blogs } = useBlogs();
    // console.log(blogs);

    return (
        <StyledSection>
            <StyledUl>
                {blogs.map((blog) => (
                    <Card key={blog.id} blog={blog} content={blog.contents.match(/<p>(.*?)<\/p>/)?.[1]} />
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
