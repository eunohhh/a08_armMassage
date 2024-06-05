import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';

function CustomImage({ item }) {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        setSrc(null);
        const img = new Image();
        img.src = item.image;
        img.onload = () => setSrc(item.image);
        img.onerror = () => setSrc(null);
    }, [item.image]);

    // return <Loader />;

    if (!src) {
        return <Loader />;
    } else {
        return <StyledImg width={720} src={src} alt={item.title}></StyledImg>;
    }
}

export default CustomImage;

const StyledImg = styled.img`
    position: relative;
    margin: 1rem auto;
`;
