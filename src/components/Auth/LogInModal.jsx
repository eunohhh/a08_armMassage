import { useState } from 'react';
import styled from 'styled-components';

const LogInModal = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userId, password);
    };

    return (
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ButtonContainer>
                    <StyledButton type="submit">회원가입</StyledButton>
                    <StyledButton type="submit">로그인</StyledButton>
                </ButtonContainer>
            </StyledForm>
        </StyledModalContainer>
    );
};

const StyledModalContainer = styled.div`
    border: 1px solid #000;
    padding: 80px;
    width: 300px;
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
`;
const StyledButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #a055ff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    &:not(:first-child) {
        margin-left: 10px;
    }

    &:hover {
        background-color: #797979;
    }
`;
export default LogInModal;
