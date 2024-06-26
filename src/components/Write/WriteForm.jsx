import useAuth from '@/hooks/useAuth';
import useBlogs from '@/hooks/useBlogs';
import base64ToFile from '@/utils/base64ToFile';
import uploadFilesAndReplaceImageSrc from '@/utils/uploadFilesAndReplaceImageSrc';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Elements/Button';
import Editor from './Editor';

function WriteForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state !== null ? location.state.blog : null;

    const { user } = useAuth();
    const { addBlogs, upBlogs } = useBlogs();
    const [contents, setContents] = useState(blog ? blog.contents : null);
    const [title, setTitle] = useState(blog ? blog.title : '');

    // console.log(user);

    const quillRef = useRef();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert('로그인이 필요합니다!');

        if (!title || !contents) return alert('내용이 입력되지 않았습니다!');

        const yes = confirm(blog ? '글을 수정하시겠습니까?' : '글을 출간하시겠습니까?');

        if (!yes) return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contents;
        const imgTags = tempDiv.getElementsByTagName('img');

        const filePromises = [...imgTags].map(async (imgTag, index) => {
            const base64String = imgTag.src;
            const fileName = `image_${index}.jpg`; // 이미지 파일명 임시...
            return await base64ToFile(base64String, fileName);
        });

        // 모든 프로미스를 해결하여 파일 객체 배열을 반환합니다.
        const files = await Promise.all(filePromises);

        const updatedContents = await uploadFilesAndReplaceImageSrc(files, contents);

        // blog 가 트루면 즉 업데이트면
        if (blog) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = updatedContents;
            const imgTags = tempDiv.getElementsByTagName('img');

            const imgSrcToUpdate = imgTags && imgTags.length > 0 ? imgTags[0].src : null;

            const temp = {
                newBlog: {
                    id: blog.id,
                    title: title,
                    contents: updatedContents,
                    created_at: new Date().toISOString(),
                    user_id: user.email,
                    nick_name: user.nickName
                },
                file: files.length > 0 && files[0].size > 0 ? files[0] : imgSrcToUpdate
            };

            upBlogs(temp);
        } else {
            const temp = {
                newBlog: {
                    title: title,
                    contents: updatedContents,
                    created_at: new Date().toISOString(),
                    user_id: user.email,
                    nick_name: user.nickName
                },
                file: files[0].size > 0 ? files[0] : null
            };

            addBlogs(temp);
        }
        navigate('/');
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            {/* <label htmlFor="title">타이틀</label> */}
            <StyledInput
                type="text"
                name="title"
                placeholder={blog ? '' : '타이틀을 입력하세요'}
                value={title}
                onChange={handleChange}
            ></StyledInput>
            <Editor ref={quillRef} onTextChange={setContents} blog={blog} />
            <StyledDiv>
                <Button buttonText={'돌아가기'} color={'#a055ff'} type={'button'} onClick={() => navigate('/')} />
                <Button buttonText={blog ? '수정하기' : '출간하기'} color={'#a055ff'} type={'submit'} />
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
    gap: 1rem;
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

// const form = e.target;
// const formData = new FormData(form);

// const title = formData.get('title')?.toString();
