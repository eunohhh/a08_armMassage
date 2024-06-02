import { useState } from 'react';
import styled from 'styled-components';
import { useModal } from '../../contexts/modal.context';
import Button from '../Elements/Button';

const Header = ({ profilePic }) => {
    const [isLogin, setIsLogin] = useState(false);
    const modal = useModal();

    const onclickLogo = () => {
        console.log('메인페이지 이동');
    };

    const onclickProfile = () => {
        console.log('프로필 페이지 이동');
    };

    const onClickWrite = () => {
        console.log('글쓰기 페이지 이동');
    };

    const onclickLogin = () => {
        setIsLogin(!isLogin);
    };

    const onclickLogout = () => {
        // setIsLogin(!isLogin);
        modal.open();
    };

    return (
        <StyledHeader>
            <StyledHeaderInner>
                <StyledLogo onClick={onclickLogo} alt="메인페이지 로고 이미지">
                    Logo
                </StyledLogo>
                <StyledLoginArea>
                    {isLogin ? (
                        <StyledLogin>
                            <StyledProfilePic onClick={onclickProfile} src={profilePic} alt="Profile 이미지 사진" />
                            <Button onClick={onClickWrite} buttonText="글쓰기" color="#a055ff"></Button>
                            <Button buttonText="로그아웃" onClick={onclickLogin} color="#a055ff"></Button>
                        </StyledLogin>
                    ) : (
                        <StyledLogin>
                            <Button buttonText="로그인" onClick={onclickLogout} color="#a055ff"></Button>
                        </StyledLogin>
                    )}
                </StyledLoginArea>
            </StyledHeaderInner>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    background-color: #3f3f3f;
    color: #fff;
    padding: 1rem;
`;

const StyledHeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
`;

const StyledLoginArea = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledProfilePic = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

export default Header;
