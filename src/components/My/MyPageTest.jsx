import useAuth from '@/hooks/useAuth';
import getDataUrl from '@/utils/getDataUrl';
import resizeAndConvertImage from '@/utils/resizeAndConvertImg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MyPageTest() {
    const { user, upProfile, upNickName } = useAuth();
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState('');
    const [profileName, setProfileName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [imgFile, setImgFile] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const convertedImg = await resizeAndConvertImage(file);
                const base64 = await getDataUrl(file);

                console.log(convertedImg);
                setProfileImage(base64);
                setImgFile(convertedImg);
            } catch (error) {
                console.error('이미지 가져오기에 실패하였습니다.', error);
            }
        }
    };

    const handleNameChange = (e) => {
        setProfileName(e.target.value);
    };

    // 닉네임, 프로필사진 변경
    const handleSubmit = (e) => {
        e.preventDefault();

        if (imgFile) {
            const picUpdate = {
                file: imgFile,
                email: userEmail
            };

            upProfile(picUpdate);
        }

        if (!profileName) return alert('변경된 것이 없습니다!');

        const nickUpdate = {
            nickName: profileName,
            email: userEmail
        };

        upNickName(nickUpdate);

        setProfileName('');
    };

    const handleBackClick = () => {
        navigate('/');
    };

    useEffect(() => {
        if (user) {
            setProfileImage(user.profile);
            setProfileName(user.nickName);
            setUserEmail(user.email);
        }
    }, [user]);

    return (
        <Section>
            <LeftDiv>
                <ImageBox>
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={profileImage ? profileImage : user && user.profile && user.profile}
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
                <Input value={profileName} placeholder={user && user.nickName} onChange={handleNameChange} />
                <Buttons>
                    <StyledButton color="#a055ff" onClick={handleSubmit}>
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

export default MyPageTest;
