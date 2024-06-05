import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useModal } from '../../contexts/modal.context';
import useAuth from '../../hooks/useAuth';
import Button from '../Elements/Button';

const Header = () => {
    const { logOut, user } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate();
    const modal = useModal();

    useEffect(() => {
        if (user) {
            if (user?.app_metadata?.provider === 'email') {
                setProfilePic(user.profile);
            } else {
                setProfilePic(user.identities[0].identity_data.avatar_url);
            }
        }
    }, [user]);

    const onclickLogo = () => {
        navigate('/');
        console.log('메인페이지 이동');
    };

    const onclickProfile = () => {
        console.log('프로필 페이지 이동');
        navigate('/myHome');
    };

    const onClickWrite = () => {
        navigate('/write');
        console.log('글쓰기 페이지 이동');
    };

    const onclickLogin = () => {
        // setIsLogin(!isLogin);
        modal.open();
    };

    const onclickLogout = () => {
        // setIsLogin(!isLogin);
        logOut();
        navigate('/');
    };

    return (
        <StyledHeader>
            <StyledHeaderInner>
                <StyledLogo onClick={onclickLogo} alt="메인페이지 로고 이미지">
                    Logo
                </StyledLogo>
                <StyledLoginArea>
                    {user ? (
                        <StyledLogin>
                            <StyledProfilePic onClick={onclickProfile} src={profilePic} alt="Profile 이미지 사진" />
                            <Button onClick={onClickWrite} buttonText="글쓰기" color="#a055ff"></Button>
                            <Button buttonText="로그아웃" onClick={onclickLogout} color="#a055ff"></Button>
                        </StyledLogin>
                    ) : (
                        <StyledLogin>
                            <Button buttonText="로그인" onClick={onclickLogin} color="#a055ff"></Button>
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
    box-sizing: border-box;
    height: 72px;
`;

const StyledHeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1600px;
    margin: 0 auto;
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
