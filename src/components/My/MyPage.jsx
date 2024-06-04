import getDataUrl from '@/utils/getDataUrl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MyPage() {
    const [profileImage, setProfileImage] = useState('images/blank-profile-picture.png');
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

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Section>
                <Div>
                    <ImageBox>
                        <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src="images/blank-profile-picture.png"
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
                </Div>
                <Div>
                    이름 변경하기
                    <br />
                    <Input placeholder="새로운 이름을 입력하세요" />
                </Div>
                <Buttons>
                    <StyledButton color="#a055ff">저장</StyledButton>
                    <StyledButton color="#a055ff" onClick={handleBackClick}>
                        돌아가기
                    </StyledButton>
                </Buttons>
            </Section>
        </>
    );
}

const Section = styled.section`
    max-width: 900px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
`;

const Div = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`;

const ImageBox = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    overflow: hidden;
    margin: 50px 0px 20px 0px;
`;

const Input = styled.input`
    margin-top: 10px;
    font-size: 15px;
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
