import React from 'react';
import { Button } from 'react-bootstrap';

const Buttons = (props) => {

    const { variant, value } = props;

    return (
        <Button variant={variant}>{value}</Button>
    );
}

export default Buttons;