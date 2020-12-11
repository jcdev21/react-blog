export const blogReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BLOG':
            return [
                ...state, {
                    image: 'image',
                    title: 'title'
                }
            ];

            break;
    
        default:
            break;
    }
}