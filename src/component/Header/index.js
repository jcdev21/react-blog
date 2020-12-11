import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import HeaderAdmin from './HeaderAdmin';
import HeaderBlog from './HeaderBlog';

const Header = () => {
    
    const { token } = useAuthContext();
    
    return (token) ? (<HeaderAdmin />) : (<HeaderBlog />);
}
 
export default Header;