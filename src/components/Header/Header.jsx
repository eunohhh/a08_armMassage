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
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            // if (user?.app_metadata?.provider === 'email') {
            //     setProfilePic(user.profile);
            // } else {
            //     setProfilePic(user.identities[0].identity_data.avatar_url);
            // }
            setProfilePic(user.profile);
            setUserId(user.id);
        }
    }, [user]);

    const onclickLogo = () => {
        navigate('/');
        console.log('메인페이지 이동');
    };

    const onclickProfile = () => {
        console.log('마이 리스트 페이지 이동');
        navigate(`/mylist/${userId}`, { state: { email: user.email } });
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
                <StyledHeaderBox1>
                    <StyledLogo onClick={onclickLogo} alt="메인페이지 로고 이미지">
                        <StyledImg src="/logo.webp" alt="sitelogo" />
                    </StyledLogo>
                    <StyledSpan>털쟁이들</StyledSpan>
                </StyledHeaderBox1>

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
    background-color: #e7e6e6;
    display: flex;
    color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    height: 72px;
`;

const StyledHeaderBox1 = styled.div`
    position: relative;
    width: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
`;

const StyledSpan = styled.span`
    color: #220d3e;
    font-size: 1.5rem;
`;

const StyledHeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledLogo = styled.div`
    position: relative;
    width: 4rem;
    height: auto;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
`;

const StyledImg = styled.img`
    position: relative;
    width: 100%;
    height: auto;
`;

const StyledLoginArea = styled.div`
    position: relative;
    width: 85%;
    display: flex;
    justify-content: flex-end;
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
