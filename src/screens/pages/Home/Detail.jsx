import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../../../contexts/BlogContext';
import styled from 'styled-components';
import Title from '../../../component/Task/Title';

const HtmlToReact = require('html-to-react').Parser;
const htmlToReact = new HtmlToReact();

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const DetailWrapper = styled.div`
    margin: 60px auto;
    max-width: 1200px;
    padding: 3em;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 75%;
    }
`;

const ContentBody = styled.div`
    margin: 25px auto;
    padding: 0 15px;
    
    p {
        text-align: left;
        font-size: 20px;
    }
`;

const Detail = (props) => {

    const { blogs, dispatch } = useContext(BlogContext);
    const { data: posts } = blogs;
    const [selectedPost, setSelectedPost] = useState({
        title: '',
        blog_image: '',
        content: '',
        created_at: '',
    });
    const currentPostId = props.match.params.id;

    useEffect(() => {
        console.log('mengatur detail ke TRUE');
        dispatch({ type: 'DETAIL', payload: true });

        const select = posts.find(post => post.id === parseInt(currentPostId));
        setSelectedPost(select);

    }, [dispatch, currentPostId, posts]);

    return (
        <div>

            {
                (selectedPost) ? (
                    <DetailWrapper>
                        <Title text={selectedPost.title} size="large" />
                        <p>{selectedPost.created_at}</p>
                        <img src={`https://blog-api-jcdev.herokuapp.com/${selectedPost.blog_image}`} alt="" />
                        <ContentBody>
                            {htmlToReact.parse(entities.decode(selectedPost.content))}
                        </ContentBody>
                    </DetailWrapper>
                ) : (<p>Posts not Click!</p>)
            }

        </div>
    );
}
 
export default Detail;