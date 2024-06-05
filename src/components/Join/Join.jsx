import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../Elements/Button';
import InputField from '../Elements/InputField';

const Join = () => {
    const { joinUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    //이메일 정규식
    const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const emailCheck = (userEmail) => {
        return emailRegEx.test(userEmail); //형식에 맞을 경우, true 리턴
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        emailCheck(e.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim() || emailCheck === false) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        if (!password.trim()) {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        if (password.length < 8) {
            alert('8자 이상 입력해 주세요.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        alert(`회원가입 성공!`);
        const authObj = { email: email, password: password, displayName: email.split('@')[0] };
        joinUp(authObj);
        navigate('/');
    };

    return (
        <>
            <JoinBox>
                <FormBox onSubmit={handleSubmit}>
                    <InputField
                        id="email"
                        type="email"
                        label="이메일"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <InputField
                        id="password"
                        type="password"
                        label="비밀번호"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <InputField
                        id="passwordConfirm"
                        type="password"
                        label="비밀번호 확인"
                        placeholder="Check Password"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                    <StyledJoin>
                        <Button type="submit" color="#a055ff" buttonText="회원가입"></Button>
                    </StyledJoin>
                </FormBox>
            </JoinBox>
        </>
    );
};

export default Join;

const FormBox = styled.form`
    width: 400px;
    height: 300px;
    border: 1px solid black;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    gap: 10px;
    padding: 20px;
    margin: 5% auto;
    padding-top: 30px;
    background-color: #afaeae;
`;

const StyledJoin = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const JoinBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
