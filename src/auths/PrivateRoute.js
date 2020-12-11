import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { getRefreshToken } from '../middleware/AuthMiddleware';

const PrivateRoute = ({ component: Component, ...restProps }) => {
    console.log('di PrivateRoute');
    const { dispatch } = useAuthContext();
    
    const refreshToken = getRefreshToken();
    
    useEffect(() => {
        console.log('di useEffect PrivateRoute');
        
        /**
         * logout atau merubah state dengan dispatch dalam kasus ini harus dalam useEffect
         * karna logout hanya di jalankan saat ada perubahan pada refreshToken
        */
        if (refreshToken === null) {
            console.log('logout...');
            dispatch({ type: 'LOGOUT', payload: null });
        }
    }, [dispatch, refreshToken]);
    
    return <Route 
        { ...restProps }

        render={props => {
            return refreshToken ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
        }}
    
    />
}

export default PrivateRoute;