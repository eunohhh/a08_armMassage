import { useModal } from '@/contexts/modal.context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Backdrop from '../Elements/Backdrop';
import Button from '../Elements/Button';
import InputField from '../Elements/InputField';

const LogInModal = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { logInWithGithub, logIn } = useAuth();
    const modal = useModal();
    const navigate = useNavigate();
    // const location = useLocation();

    const onSubmit = async (e) => {
        e.preventDefault();

        const idType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!idType.test(userId)) {
            alert('이메일 형식으로 아이디를 입력해주세요.');
            return;
        }
        if (password.length < 4) {
            alert('비밀번호는 4글자 이상으로 입력해주세요.');
            return;
        }

        const authObject = {
            email: userId,
            password: password
        };

        // 이부분 추가 : 잘못된 아이디로 로그인했을 경우
        try {
            await logIn(authObject).unwrap();
            modal.close();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };
    const handleGithubClick = (e) => {
        e.preventDefault();
        modal.close();
        // logInWithGithub(location.pathname);
        logInWithGithub();
    };
    const handleJoinPage = () => {
        navigate('/join');
        modal.close();
    };

    return (
        <Backdrop>
            <StyledModalContainer>
                <StyledForm onSubmit={onSubmit}>
                    <InputField
                        label="아이디"
                        type="text"
                        placeholder="이메일을 입력하세요."
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <InputField
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonContainer>
                        <Button type="button" buttonText="회원가입" color="#a055ff" onClick={handleJoinPage}></Button>
                        <Button type="submit" buttonText="로그인" color="#a055ff"></Button>
                        <Button
                            type="button"
                            buttonText="깃헙로그인"
                            color="#a055ff"
                            onClick={handleGithubClick}
                        ></Button>
                    </ButtonContainer>
                </StyledForm>
            </StyledModalContainer>
        </Backdrop>
    );
};

const StyledModalContainer = styled.div`
    border: 1px solid #000;
    padding: 80px;
    width: 320px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 1rem;
`;

export default LogInModal;
