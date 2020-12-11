import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BlogContext } from '../../../../contexts/BlogContext';

// Services
import { getAllPublic } from '../../../../services/BlogService';

// Components
import Title from '../../../../component/Task/Title';
import Card from '../../../../component/Task/Card';
import ButtonComponent from '../../../../component/Task/ButtonComponent';

const ContentWrapper = styled.div`
    margin: 100px auto;
    margin-top: 150px;
    background-color: #fff;
    max-width: 1200px;
    border-radius: 5px;
    position: relative;
    padding: 20px;
`;

const Content = styled.div`
    margin: 35px auto;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 5em 3em;
`;

const PostContent = () => {

    const { blogs, dispatch } = useContext(BlogContext);
    const { 
        data: posts, 
        totalResults, 
        isDetail, 
        isLoading, 
        currentPage, 
        dataSearch, 
        isSearch 
    } = blogs;
    const [page, setPage] = useState(currentPage);
    const [showDetail, setShowDetail] = useState(isDetail);

    useEffect(() => {
        
        if (!showDetail) {
            dispatch({ type: 'LOADING' });
            setTimeout(() => {
                try {
                    getAllPublic(page).then(d => {
                        dispatch({ 
                            type: 'SET_BLOG_PUBLIC',
                            payload: {
                                data: d.data,
                                results: d.totalResults,
                                currentPage: page,
                            }
                        });
                    });
                } catch (error) {
                    console.log(error);
                }
            }, 500);
        }

    }, [page, dispatch, showDetail]);

    return (
        <ContentWrapper>
            <Title text="Postingan.!" size="medium" />

            {
                isSearch ? (
                    <Content>
                        {
                            dataSearch.map((data, i) => (
                                <NavLink to={`/detail/${data.id}`} style={{ textDecoration: 'none' }} key={i} >
                                    <Card contents={data} key={i} />
                                </NavLink>
                            ))
                        }
                    </Content>
                ) : (
                    <>
                    <Content>
                        {
                            posts.map((data, i) => (
                                <NavLink to={`/detail/${data.id}`} style={{ textDecoration: 'none' }} key={i} >
                                    <Card contents={data} key={i} />
                                </NavLink>
                            ))
                        }
                    </Content>

                    {
                        
                        posts.length < totalResults ? (
                            <ButtonComponent 
                                text={ isLoading ? '... Load More' : 'Load More' }
                                type="primary"
                                disabled={isLoading}
                                onClick={() => {
                                    setShowDetail(false);
                                    setPage( c => c + 1 )
                                    return;
                                }}
                            />
                        ) : null
                    }
                    </>
                )
            }

        </ContentWrapper>
    );
}
 
export default PostContent;