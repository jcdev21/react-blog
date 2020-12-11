import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    background: #2A65EA;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'HammersmithOne', sans-serif;
    color: #ffffff;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <h1>BLOgs</h1>
            <div>jcdev21</div>
        </FooterWrapper>
    );
}
 
export default Footer;