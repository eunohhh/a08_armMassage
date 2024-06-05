import { useMemo } from 'react';
import useBlogs from '../../hooks/useBlogs';

function Likes({ id }) {
    const { blogs } = useBlogs();

    const blog = useMemo(() => blogs.find((blog) => blog.id === id), [id, blogs]);

    return <span>{blog && blog.likes}</span>;
}

export default Likes;
