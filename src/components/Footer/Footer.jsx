import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
    return (
        <StyledFooter>
            <StyledP>A08 팔좀주물러조</StyledP>
            <StyledDiv>
                <img width={30} height={30} src="/github-mark.png" alt="github-mark"></img>
                <Link to={'https://github.com/eunohhh'}>
                    <StyledSpan>오은</StyledSpan>
                </Link>
                <Link to={'https://github.com/YISYISYISYIS'}>
                    <StyledSpan>유인수</StyledSpan>
                </Link>
                <Link to={'https://github.com/SonJihun507'}>
                    <StyledSpan>손지훈</StyledSpan>
                </Link>
                <Link to={'https://github.com/hyunjeongkwak'}>
                    <StyledSpan>곽현정</StyledSpan>
                </Link>
                <Link to={'https://github.com/iamheroine'}>
                    <StyledSpan>김도희</StyledSpan>
                </Link>
            </StyledDiv>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    background-color: #e7e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #220d3e;
    padding: 1rem;
    box-sizing: border-box;
    height: 72px;
    gap: 1rem;

    a {
        box-sizing: border-box;
        padding-top: 0.2rem;
        color: #220d3e;
        text-decoration: none;
        outline: none;
        transition: all 0.3s;
    }

    a:hover {
        color: #8165a5;
    }
`;

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
`;

const StyledP = styled.p`
    box-sizing: border-box;
    padding-top: 0.2rem;
`;

const StyledSpan = styled.span`
    box-sizing: border-box;
    padding-top: 0.2rem;
`;
