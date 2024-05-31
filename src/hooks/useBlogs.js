import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlogs, deleteBlogs, getBlogs, updateBlogs } from '../redux/blogs.slice';

const useBlogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const blogLoading = useSelector((state) => state.blogs.blogLoading);
    const blogError = useSelector((state) => state.blogs.blogError);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const addBlogs = (newBlog) => dispatch(createBlogs(newBlog));
    const upBlogs = (newBlog) => dispatch(updateBlogs(newBlog));
    const delBlogs = (blogId) => dispatch(deleteBlogs(blogId));

    return {
        blogs,
        blogLoading,
        blogError,
        addBlogs,
        upBlogs,
        delBlogs
    };
};

export default useBlogs;
