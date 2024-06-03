import { useState } from 'react';
import styled from 'styled-components';
import JoinInput from '../components/Elements/JoinInput';

const FormBox = styled.form`
    width: 400px;
    height: 300px;
    border: 1px solid black;
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
    background-color: #d2d2d2;
`;

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim()) {
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
        alert(`회원가입 성공! 당신의 이메일은 ${email} & 비밀번호는 ${password}입니다.`);
    };

    return (
        <FormBox onSubmit={handleSubmit}>
            <Input id="email" type="email" label="이메일" eholder="E-mail" value={email} onChange={handleEmailChange} />

            <JoinInput
                id="password"
                type="password"
                label="비밀번호"
                eholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />

            <JoinInput
                id="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                eholder="Check Password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
            />
            <button type="submit">회원가입</button>
        </FormBox>
    );
}

export default App;
