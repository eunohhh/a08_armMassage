import useBlogs from './hooks/useBlogs';

function BlogTest() {
    const { blogs, blogLoading, blogError, addBlogs, delBlogs } = useBlogs();

    const handleAddCick = () => {
        const temp = {
            title: '너무 어려워',
            contents: '진짜 너무해',
            nick_name: '별명',
            origin: '한국',
            created_at: new Date().toISOString(),
            user_id: 'eunoh'
        };
        addBlogs(temp);
    };

    const handleDelete = (blogId) => () => delBlogs(blogId);

    return (
        <>
            {blogLoading && <p>Loading...</p>}
            {blogError && <p>Error: {blogError}</p>}
            <div>
                {blogs &&
                    blogs.map((blog) => (
                        <div key={blog.id} style={{ border: '1px solid black' }}>
                            <p>{blog.title}</p>
                            <p>{blog.contents}</p>
                            <p>{blog.origin}</p>
                            <p>{blog.nick_name}</p>
                            <button>수정</button>
                            <button onClick={handleDelete(blog.id)}>삭제</button>
                        </div>
                    ))}
            </div>
            <button onClick={handleAddCick}>추가하기</button>
        </>
    );
}

export default BlogTest;
