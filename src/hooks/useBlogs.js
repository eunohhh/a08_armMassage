import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createBlogs, deleteBlogs, getBlogs, updateBlogs, updateLikes } from '../redux/blogs.slice';

const useBlogs = () => {
    const dispatch = useDispatch();

    const { blogs, blogLoading, blogError } = useSelector(
        (state) => ({
            blogs: state.blogs.blogs,
            blogLoading: state.blogs.blogLoading,
            blogError: state.blogs.blogError
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const addBlogs = (newBlog) => dispatch(createBlogs(newBlog));
    const upBlogs = (newBlog) => dispatch(updateBlogs(newBlog));
    const delBlogs = (blogId) => dispatch(deleteBlogs(blogId));
    const addLikes = (blogId) => dispatch(updateLikes(blogId));

    return {
        blogs,
        blogLoading,
        blogError,
        addBlogs,
        upBlogs,
        delBlogs,
        addLikes
    };
};

export default useBlogs;
