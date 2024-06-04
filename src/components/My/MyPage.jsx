import { authSliceName } from '@/redux/auth.slice';
import getDataUrl from '@/utils/getDataUrl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MyPage() {
    const [profileImage, setProfileImage] = useState('images/blank-profile-picture.png');
    const [profileName, setProfileName] = useState('');
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await getDataUrl(file);
                setProfileImage(base64);
            } catch (error) {
                console.error('이미지 가져오기에 실패하였습니다.', error);
            }
        }
    };

    const handleNameChange = (e) => {
        setProfileName(e.target.value);
    };

    const handleSubmitName = (e) => {
        e.preventDefault();
        // console.log(profileName);
        setProfileName('');
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <Section>
            <LeftDiv>
                <ImageBox>
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={profileImage}
                        alt="profile image"
                    />
                </ImageBox>
                <StyledButton color="#a055ff" onClick={() => document.getElementById('fileInput').click()}>
                    이미지 변경하기
                </StyledButton>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </LeftDiv>
            <RightDiv>
                <Label>이름 변경하기</Label>
                <br />
                <Input value={profileName} placeholder={authSliceName} onChange={handleNameChange} />
                <Buttons>
                    <StyledButton color="#a055ff" onClick={handleSubmitName}>
                        저장
                    </StyledButton>
                    <StyledButton color="#a055ff" onClick={handleBackClick}>
                        돌아가기
                    </StyledButton>
                </Buttons>
            </RightDiv>
        </Section>
    );
}

const Section = styled.section`
    max-width: 900px;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px 50px 20px 50px;
`;

const LeftDiv = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const RightDiv = styled.div`
    margin-left: 60px;
`;

const ImageBox = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 70%;
    display: flex;
    justify-content: center;
    background-color: #f0f0f0;
    overflow: hidden;
    margin: 50px 0px 20px 0px;
`;

const Label = styled.label`
    font-size: 19px;
`;

const Input = styled.input`
    margin: 20px 0px 25px 0px;
    font-size: 15px;
    height: 25px;
    font-size: 25px;
    padding: 5px;
`;

const Buttons = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledButton = styled.button`
    padding: 8px 20px;
    height: 34px;
    margin-top: 10px;
    background-color: ${(props) => props.color};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out 0s;
    &:hover {
        background-color: #d2d2d2;
        color: #3f3f3f;
    }
`;

export default MyPage;
