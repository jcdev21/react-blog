import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 5px;
    color: #A3A3A3;
    width: 350px;

    ::placeholder { color: #A3A3A3; }
`;

const TextInput = ({ name, placeholder, value, onChange }) => {
    return (
        <Input 
            type="text" 
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
 
export default TextInput;