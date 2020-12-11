import React, { createContext, useReducer } from 'react';
import { UserReducer } from '../reducers/UserReducer';

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
}

export const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
    
    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider 
            value={{
                state,
                dispatch
            }}
        >
            { children }
        </UserContext.Provider>
    );
}

export default UserContextProvider;