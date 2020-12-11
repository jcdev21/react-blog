import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import TableUser from './component/TableUser';

const User = () => {

    useEffect(() => {
        console.log('useEffect in User');
    });

    return (
        <div>
            <NavLink to="/user/adduser">
                <Button type="button" variant="success">Add User</Button>
            </NavLink>

            <hr/>

            <MemoizedTableUser />
        </div>
    );
}

const MemoizedTableUser = React.memo(TableUser);
 
export default User;