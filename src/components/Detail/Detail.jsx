import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CustomImage from '../Elements/CustomImage';
import LikeButton from '../Elements/LikeButton';
import Likes from '../Elements/Likes';

const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))/g;
// 이미지는 12:9 비율
function Detail() {
    const location = useLocation();
    const { blog } = location.state;

    const diffDays = useMemo(() => {
        // 주어진 날짜를 Date 객체로 변환
        const givenDate = new Date(blog.created_at);
        // 오늘 날짜를 가져오기
        const today = new Date();
        // 두 날짜 사이의 차이(밀리초 단위)
        const diffTime = Math.abs(today - givenDate);
        // 차이를 일 단위로 변환
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }, [blog.created_at]);

    const cleanHTML = DOMPurify.sanitize(blog.contents);

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
            return <StyledP>{node.children[0].data}</StyledP>;
        }
        return domToReact(node.children, { replace: replaceImgTag });
    };

    return (
        <StyledSection>
            <StyledH2>{blog.title}</StyledH2>

            <StyledH3>
                {blog.user_id.match(regex)} · {diffDays}일 전 &nbsp;&nbsp;
                <LikeButton id={blog.id} /> &nbsp;
                <Likes id={blog.id} />
            </StyledH3>

            {parse(cleanHTML, { replace: replaceImgTag })}

            {/* {blog.image && <CustomImage item={blog} />} */}
            {/* <StyledP>
                {blog.contents}
            </StyledP> */}

            {blog.origin && (
                <StyledP>
                    <StyledSpan>출신 :</StyledSpan> {blog.origin}
                </StyledP>
            )}
            {blog.nick_name && (
                <StyledP>
                    <StyledSpan>별칭 :</StyledSpan> {blog.nick_name}
                </StyledP>
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
    box-sizing: border-box;
    padding: 1rem 0;
    white-space: pre-wrap;
`;

const StyledSpan = styled.span`
    position: relative;
    font-weight: 600;
`;
