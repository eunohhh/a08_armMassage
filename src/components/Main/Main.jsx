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
    padding: 4rem 0;
    background-color: #9b9494;
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
`;

const StyledUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

export default Main;
