import React, { createContext, useReducer } from 'react';
import AppReducer from '../reducers/AppReducer';

const initialState = {
    employees: [
        {
            id: 1,
            title: "Monkey D Luffy",
            content: "East Blue",
        },
        {
            id: 2,
            title: "Roronoa Zoro",
            content: "East Blue",
        }
    ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeEmployee(id) {
        dispatch({
            type: "REMOVE_EMPLOYEE",
            payload: id
        });
    }

    function addEmployee(employees) {
        dispatch({
            type: "ADD_EMPLOYEE",
            payload: employees
        });
    }

    function editEmployee(employees) {
        dispatch({
            type: "EDIT_EMPLOYEE",
            payload: employees
        });      
    }

    return (
        <GlobalContext.Provider
            value={{
                employees: state.employees,
                removeEmployee,
                addEmployee,
                editEmployee
            }}
        >
            { children }
        </GlobalContext.Provider>
    );
}