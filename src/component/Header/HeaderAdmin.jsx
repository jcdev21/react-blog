import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ButtonComponent from '../Task/ButtonComponent';
import { logout } from '../../middleware/AuthMiddleware';
import { useAuthContext } from '../../contexts/AuthContext';

const HeaderAdmin = () => {

    const { dispatch } = useAuthContext();
    const history = useHistory();

    const handleLogout = () => {
        const confLogout = window.confirm('Logout..?');

        if (confLogout) {
            if (logout()) {
                dispatch({ type: 'LOGOUT', payload: null });
                history.push('/login');
            }
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/user" className="nav-link">User</NavLink>
                    <NavLink to="/post" className="nav-link">Posts</NavLink>
                    <ButtonComponent text="logout" type="primary" onClick={handleLogout} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
 
export default HeaderAdmin;