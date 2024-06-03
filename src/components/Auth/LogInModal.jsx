import { useState } from 'react';
import styled from 'styled-components';
import Backdrop from '../Elements/Backdrop';
import Button from '../Elements/Button';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogInModal = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { logInWithGithub, logIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(userId, password);
        logIn(userId, password);
    };
    const handleGithubClick = () => {
        logInWithGithub();
    };
    const handleJoinPage = () => {
        navigate('/join');
    };

    return (
        <Backdrop>
            <StyledModalContainer>
                <StyledForm onSubmit={onSubmit}>
                    <label>아이디</label>
                    <StyledInput
                        type="text"
                        placeholder="아이디를 입력하세요."
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <label>비밀번호</label>
                    <StyledInput
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

const StyledInput = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 1rem;
`;

export default LogInModal;
