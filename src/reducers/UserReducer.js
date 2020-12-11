export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                users: [...state.users, ...action.payload],
                isLoading: false
            };

        case 'CREATE':
            return {
                ...state,
                users: [...state.users, action.payload]
            };

        case 'EDIT':
            const updatedUser = action.payload;
            const updatedUsers = state.users.map(user => {
                if (user.id === updatedUser.id) {
                    return updatedUser;
                }

                return user;
            });

            return {
                ...state,
                users: updatedUsers
            }

        case 'DELETE':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload)
            };

        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }

        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
    
        default: return state;
    }
}