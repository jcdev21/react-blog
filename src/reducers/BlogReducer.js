export const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOG':
            return {
                ...state,
                data: [...state.data, ...action.payload],
                isLoading: false
            };

        case 'SET_BLOG_PUBLIC':
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                totalResults: action.payload.results,
                currentPage: action.payload.currentPage,
                isLoading: false,
                isSearch: false,
            };

        case 'DETAIL':
            return {
                ...state,
                isDetail: action.payload,
                isSearch: false,
            }
            
        case 'SEARCH':

            const text = action.payload;

            const result = (text !== '') ? state.data.filter(post => {
                return post.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
            }) : [];

            return {
                ...state,
                dataSearch: result,
                isSearch: true,
                isLoading: false
            }

        case 'CREATE':
            return {
                ...state,
                data: [...state.data, action.payload]
            };

        case 'DELETE':
            return {
                ...state,
                data: state.data.filter((d) => d.id !== action.payload)
            };

        case 'EDIT':
            const updatedPost = action.payload;
            const updatedPosts = state.data.map(post => {
                if (post.id === updatedPost.id) {
                    return updatedPost;
                }

                return post;
            });

            return {
                ...state,
                data: updatedPosts
            }

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

        case 'GET_ALL_BLOG':
            return {
                ...state,
                isLoading: false
            };

        case 'GET_ONE':
            return {
                ...state,
                data: state.data.filter((d) => d.id === action.payload)
            };

        default: return state;
    }
}