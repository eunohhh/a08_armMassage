import useAuth from '@/hooks/useAuth';
import useBlogs from '@/hooks/useBlogs';
import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Elements/Button';
import CustomImage from '../Elements/CustomImage';
import LikeButton from '../Elements/LikeButton';
import Likes from '../Elements/Likes';

const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))/g;
// 이미지는 12:9 비율
function Detail() {
    const { user } = useAuth();
    const { blogs, delBlogs } = useBlogs();
    const navigate = useNavigate();
    const params = useParams();
    const [isCurrentLoggedInUser, setIsCurrentLoggedInUser] = useState(false);

    const handleDeleteButtonClick = (blogId) => (e) => {
        e.preventDefault();

        const yes = confirm('정말 삭제하시겠습니까?');

        if (yes) {
            delBlogs(blogId);
            navigate('/');
        } else {
            return;
        }
    };

    const blog = useMemo(() => blogs.find((blog) => blog.id === params.id), [blogs, params.id]);

    const diffDays = useMemo(() => {
        if (blog) {
            // 주어진 날짜를 Date 객체로 변환
            const givenDate = new Date(blog.created_at);
            // 오늘 날짜를 가져오기
            const today = new Date();
            // 두 날짜 사이의 차이(밀리초 단위)
            const diffTime = Math.abs(today - givenDate);
            // 차이를 일 단위로 변환
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
    }, [blog]);

    const cleanHTML = useMemo(() => {
        if (blog) {
            return DOMPurify.sanitize(blog.contents);
        }
    }, [blog]);

    // 그냥 html 을 react dom 으로
    const replaceImgTag = (node) => {
        if (node.name === 'img') {
            const { src } = node.attribs;
            const item = {
                image: src,
                title: 'blog_image'
            };
            return <CustomImage item={item} />;
        }
        if (node.name === 'p') {
            return <StyledP>{domToReact(node.children || [], { replace: replaceImgTag })}</StyledP>;
        }
        return domToReact(node.children || [], { replace: replaceImgTag });
    };

    useEffect(() => {
        if (user) {
            if (user.email === blog.user_id) {
                setIsCurrentLoggedInUser(true);
            }
        }
    }, [user, blog]);

    if (!blog) {
        return <div>Blog not found</div>; // 해당 블로그를 찾을 수 없을 때
    }

    return (
        <StyledSection>
            <StyledH2>{blog.title}</StyledH2>

            <StyledH3>
                {blog.user_id.match(regex)} · {diffDays}일 전 &nbsp;&nbsp;
                <LikeButton id={blog.id} /> &nbsp;
                <Likes id={blog.id} />
            </StyledH3>

            {parse(cleanHTML, { replace: replaceImgTag })}

            {isCurrentLoggedInUser && (
                <StyledDiv>
                    <Button
                        buttonText={'삭제하기'}
                        color={'#a055ff'}
                        type={'button'}
                        onClick={handleDeleteButtonClick(blog.id)}
                    />
                    <Button
                        buttonText={'수정하기'}
                        color={'#a055ff'}
                        type={'button'}
                        onClick={() => navigate('/write', { state: { blog } })}
                    />
                </StyledDiv>
            )}
        </StyledSection>
    );
}

export default Detail;

const StyledSection = styled.section`
    position: relative;
    width: 1080px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
`;

const StyledH2 = styled.h2`
    position: relative;
    font-size: 2rem;
    font-weight: 600;
    box-sizing: border-box;
    padding: 1rem 0;
`;

const StyledH3 = styled.h3`
    position: relative;
    font-weight: 600;
    box-sizing: border-box;
    padding: 1rem 0;
`;

const StyledP = styled.p`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem 0;
    white-space: pre-wrap;
`;

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

// const StyledSpan = styled.span`
//     position: relative;
//     font-weight: 600;
// `;
