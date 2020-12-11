import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Component Task
import ButtonComponent from '../Task/ButtonComponent';

// Icons
import { ReactComponent as EnterIcon } from '../../assets/Icons/enter.svg';

const Header = styled.header`
    background-color: #fff;
    font-family: 'HammersmithOne', sans-serif;
    max-width: 1200px;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Menu = styled.div`
    display: flex;
    align-items: stretch;

    > * {
        margin: 0 10px;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }
    }
`;

const SpanLink = styled.span`
    display: flex;
    align-items: center;
    height: 100%;
`;

const Logo = styled.h1`
    color: #2A65EA;
    font-size: 24px;
`;

const HeaderBlog = () => {
    return (
        <Header>
            <div className="logo">
                <Logo>BLOgs</Logo>
            </div>
            <Menu>
                <NavLink to="/">
                    <SpanLink>Home</SpanLink>
                </NavLink>
                <NavLink to="/login">
                    <ButtonComponent text="Login" icon={<EnterIcon />} />
                </NavLink>
                <ButtonComponent text="Register" type="secondary" />
            </Menu>
        </Header>
    );
}
 
export default HeaderBlog;