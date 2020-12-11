export const authReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':
            return {
                ...state,
                token: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                token: action.payload
            }
    
        default: return state;
    }
}