import React, { createContext, useReducer } from 'react';
import { blogReducer } from '../reducers/BlogReducer';

const initialState = {
    data: [],
    totalResults: 0,
    isDetail: false,
    isLoading: false,
    isError: false,
    currentPage: 1,
    dataSearch: [],
    isSearch: false,
}

export const BlogContext = createContext(initialState);

const BlogContextProvider = (props) => {
    
    const [ blogs, dispatch ] = useReducer(blogReducer, initialState);

    return (
        <BlogContext.Provider 
            value={{ 
                blogs,
                dispatch
            }} 
        >
            { props.children }
        </BlogContext.Provider>
    );
}
 
export default BlogContextProvider;