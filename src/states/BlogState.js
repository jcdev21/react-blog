import React, { createContext, useReducer } from 'react';
import { blogReducer } from '../stores/BlogStore';

export const BlogContext = createContext();

const initialState = {
    image: '',
    title: ''
}

const BlogStateProvider = (props) => {
    const [ blogs, dispatch ] = useReducer(blogReducer, initialState);

    return (
        <BlogContext.Provider value={{ blogs, dispatch }} >
            { props.children }
        </BlogContext.Provider>
    );
}
 
export default BlogStateProvider;