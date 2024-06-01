import React from 'react';
import { useModal } from './contexts/modal.context';
import useAuth from './hooks/useAuth';
import useBlogs from './hooks/useBlogs';

function BlogTest() {
    const { blogs, addBlogs, delBlogs } = useBlogs();
    const { user } = useAuth();
    const modal = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) return alert('글쓰고 싶으면 로그인해');

        const form = e.target;
        const formData = new FormData(form);
        const file = formData.get('file');
        const title = formData.get('title').toString();
        const contents = formData.get('contents').toString();
        const nick = formData.get('nick').toString();
        const origin = formData.get('origin')?.toString();

        const temp = {
            newBlog: {
                title: title,
                contents: contents,
                nick_name: nick,
                origin: origin,
                created_at: new Date().toISOString(),
                user_id: user.email
            },
            file: file ? file.size > 0 : null
        };
        addBlogs(temp);
    };

    const handleDelete = (blogId) => () => delBlogs(blogId);

    const handleUpdate = (blog) => () => {
        const options = {
            blog: blog,
            user: user
        };
        modal.open(options);
    };

    // console.log('재랜더링');

    return (
        <>
            {/* {blogLoading && <p>Loading...</p>}
            {blogError && <p>Error: {blogError}</p>} */}
            <div>
                {blogs &&
                    blogs.map((blog) => (
                        <div key={blog.id} style={{ border: '1px solid black' }}>
                            <p>{blog.title}</p>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{blog.contents}</p>
                            <p>{blog.origin}</p>
                            <p>{blog.nick_name}</p>
                            <button onClick={handleUpdate(blog)}>수정</button>
                            <button onClick={handleDelete(blog.id)}>삭제</button>
                        </div>
                    ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="file" className="hidden" name="file" />
                <label htmlFor="title">타이틀</label>
                <input type="text" name="title"></input>
                <label htmlFor="contents">내용</label>
                <textarea type="text" name="contents"></textarea>
                <label htmlFor="nick">별명</label>
                <input type="text" name="nick"></input>
                <label htmlFor="origin">출신</label>
                <input type="text" name="origin"></input>
                <button type="submit">추가하기</button>
            </form>
        </>
    );
}

export default React.memo(BlogTest);
