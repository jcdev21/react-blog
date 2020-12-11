import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowBottomIcon } from '../../assets/Icons/arrow-bottom.svg';

const SelectWrapper = styled.div`
    position: relative;
    display: flex;

    > svg {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }
`;

const Select = styled.select`
    border: none;
    background-color: #fff;
    padding: 12px 20px;
    display: block;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 5px;
    color: #A3A3A3;
    width: 180px;
    appearance: none;
`;

const SelectInput = ({ options, name, placeholder, value, onChange }) => {
    return (
        <SelectWrapper>
            <Select name={name} value={value} onChange={onChange} >
                <option value="">{placeholder}</option>
            
                {
                    options.map(option => (
                        <option 
                            value={option.value}
                            key={option.value}
                        >
                            {option.label}
                        </option>
                    ))
                }
            </Select>

            <ArrowBottomIcon />
        </SelectWrapper>
    );
}
 
export default SelectInput;