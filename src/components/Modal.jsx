import { useId } from 'react';
import styled from 'styled-components';
import { useModal } from '../contexts/modal.context';
import useBlogs from '../hooks/useBlogs';
import Backdrop from './Backdrop';

const StyledDiv = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    max-width: 320px;
`;

function Modal({ options }) {
    const { upBlogs } = useBlogs();
    const modal = useModal();

    const id = useId();

    // const { release } = useScrollLock();

    const handleClick = () => {
        modal.close();
        // release();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!options.user) return alert('글 수정 하고 싶으면 로그인해');

        const form = e.target;
        const formData = new FormData(form);
        const file = formData.get('file');
        const title = formData.get('title').toString();
        const contents = formData.get('contents').toString();
        const nick = formData.get('nick').toString();
        const origin = formData.get('origin')?.toString();

        const temp = {
            newBlog: {
                id: options.blog.id,
                title: title,
                contents: contents,
                nick_name: nick,
                origin: origin,
                created_at: new Date().toISOString(),
                user_id: options.user.email
            },
            file: file ? file.size > 0 : null
        };
        upBlogs(temp);
        modal.close();
    };

    return (
        <Backdrop>
            <StyledDiv className="modal">
                <form onSubmit={handleSubmit}>
                    <input type="file" className="hidden" name="file" />
                    <label htmlFor={`${id}_title`}>타이틀</label>
                    <input id={`${id}_title`} type="text" name="title" placeholder={options.blog.title}></input>
                    <label htmlFor={`${id}_contents`}>내용</label>
                    <textarea
                        id={`${id}_contents`}
                        type="text"
                        name="contents"
                        placeholder={options.blog.contents}
                    ></textarea>
                    <label htmlFor={`${id}_nick`}>별명</label>
                    <input id={`${id}_nick`} type="text" name="nick" placeholder={options.blog.nick_name}></input>
                    <label htmlFor={`${id}_origin`}>출신</label>
                    <input id={`${id}_origin`} type="text" name="origin" placeholder={options.blog.origin}></input>
                    <button type="submit">수정하기</button>
                </form>
                {/* <h1>{title}</h1>
                <p>{content}</p> */}
                <button onClick={handleClick}>꺼라</button>
            </StyledDiv>
        </Backdrop>
    );
}

export default Modal;
