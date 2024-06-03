import useAuth from '@/hooks/useAuth';
import useBlogs from '@/hooks/useBlogs';
import uploadFilesAndReplaceImageSrc from '@/utils/uploadFilesAndReplaceImageSrc';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Elements/Button';
import Editor from './Editor';
// import supabase from '@/supabase/supabaseClient';

function WriteForm() {
    const location = useLocation();
    const blog = location.state !== null ? location.state.blog : null;

    const { user } = useAuth();
    const { addBlogs } = useBlogs();
    const [contents, setContents] = useState(null);
    const [files, setFiles] = useState(null);

    const quillRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert('글 쓰고 싶으면 좋은 말 할 때 로그인 해');

        const form = e.target;
        const formData = new FormData(form);

        const title = formData.get('title')?.toString();

        if (!title || !contents) return alert('내용부터 입력 해야지 에휴...');

        const updatedContents = await uploadFilesAndReplaceImageSrc(files, contents);

        const temp = {
            newBlog: {
                title: title,
                contents: updatedContents,
                nick_name: '테스트',
                origin: '테스트',
                created_at: new Date().toISOString(),
                user_id: user.email
            },
            file: files[0].size > 0 ? files[0] : null
        };

        addBlogs(temp);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            {/* <label htmlFor="title">타이틀</label> */}
            <StyledInput
                type="text"
                name="title"
                placeholder={blog ? blog.contents : '타이틀을 입력하세요'}
            ></StyledInput>
            <Editor ref={quillRef} onTextChange={setContents} setFiles={setFiles} />
            <StyledDiv>
                <Button buttonText={'출간하기'} color={'#a055ff'} type={'submit'} />
            </StyledDiv>
        </StyledForm>
    );
}

export default WriteForm;

const StyledForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem;
`;

const StyledInput = styled.input`
    border: 1px solid #ccc;
    margin: 0 2rem;
    height: 2.5rem;
    font-size: 2rem;
`;

const StyledDiv = styled.div`
    position: relative;
    margin: 0 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

// let imgData, imgError;

//     // 파일이 있는 경우에만 파일 업로드를 수행
//     if (file !== null) {

//         const uploadResult = await supabase.storage.from('blogs').upload(`${Date.now()}_${file.name}`, file);

//         imgData = uploadResult.data;
//         imgError = uploadResult.error;

//         if (imgError) {
//             console.log('error => ', imgError);
//         }
//     }
