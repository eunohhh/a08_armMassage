import styled from 'styled-components';
import useBlogs from '../../hooks/useBlogs';
import Loader from '../Elements/Loader';
import Card from '../List/Card';

const Main = () => {
    const { blogs } = useBlogs();

    return (
        <StyledSection $blogs={blogs}>
            {blogs.length > 0 ? (
                <StyledUl>
                    {blogs &&
                        blogs.map((blog) => (
                            <Card key={blog.id} blog={blog} content={blog.contents.match(/<p>(.*?)<\/p>/)?.[1]} />
                        ))}
                </StyledUl>
            ) : (
                <Loader />
            )}
        </StyledSection>
    );
};

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: ${({ $blogs }) => ($blogs.length > 0 ? '#9b9494' : 'white')};
    margin: 0 auto;
`;

const StyledUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
`;

export default Main;
