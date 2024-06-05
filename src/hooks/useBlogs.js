import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createBlogs, createImgs, deleteBlogs, getBlogs, updateBlogs, updateLikes } from '../redux/blogs.slice';

const useBlogs = () => {
    const dispatch = useDispatch();

    const { blogs, blogLoading, blogError, imageSrc } = useSelector(
        (state) => ({
            blogs: state.blogs.blogs,
            blogLoading: state.blogs.blogLoading,
            blogError: state.blogs.blogError,
            imageSrc: state.blogs.imageSrc
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const addBlogs = (newBlog) => dispatch(createBlogs(newBlog)).then(() => dispatch(getBlogs()));
    const upBlogs = (newBlog) => dispatch(updateBlogs(newBlog)).then(() => dispatch(getBlogs()));
    const delBlogs = (blogId) => dispatch(deleteBlogs(blogId)).then(() => dispatch(getBlogs()));
    const addLikes = (ids) => dispatch(updateLikes(ids)).then(() => dispatch(getBlogs()));
    const addImgs = (imgFile) => dispatch(createImgs(imgFile));

    return {
        blogs,
        blogLoading,
        blogError,
        imageSrc,
        addBlogs,
        upBlogs,
        delBlogs,
        addLikes,
        addImgs
    };
};

export default useBlogs;
