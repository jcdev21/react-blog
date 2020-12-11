import React, { createContext, useContext, useReducer } from 'react';
import { authReducer } from '../reducers/AuthReducer';
import AuthMiddleware, { getRefreshToken } from '../middleware/AuthMiddleware';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    console.log('Auth Context Provider');

    AuthMiddleware.init();

    const [state, dispatch] = useReducer(authReducer, {}, () => {
        
        const refreshToken = getRefreshToken();
        
        const initialState = {
            token: refreshToken
        };

        return initialState;
    });

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        { props.children }
    </AuthContext.Provider>;
}
 
export default AuthContextProvider;