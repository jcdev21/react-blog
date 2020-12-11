import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    background-color: ${props => props.type.bgColor};
    color: ${props => props.type.textColor};;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: ${props => props.type.fontWeight};

    display: flex;
    align-items: center;

    svg {
        margin-right: 10px;
        fill: #fff;
    }

    &:hover {
        background-color: ${props => props.type.bgColorHover};
    }
`;

const buttonType = {
    primary: {
        textColor: '#FFF',
        bgColor: '#2A65EA',
        fontWeight: 'bold',
        bgColorHover: '#5086FF'
    },
    secondary: {
        textColor: '#303030',
        bgColor: '#FFF',
        fontWeight: 'normal',
        bgColorHover: '#EFF5FF'
    }
}

const ButtonComponent = ({ text, icon, type, disabled, onClick }) => {
    return (
        <Button type={buttonType[type]} disabled={disabled} onClick={onClick} >
            {icon}
            {text}
        </Button>
    );
}

ButtonComponent.defaultProps = {
    type: 'primary',
}
 
export default ButtonComponent;