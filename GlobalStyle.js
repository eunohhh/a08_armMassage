import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    #root {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

export default GlobalStyles;
