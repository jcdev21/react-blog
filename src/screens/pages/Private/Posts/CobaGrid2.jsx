import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BlogContext } from '../../../../contexts/BlogContext';

// Grid
import { Grid, _ } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

// Icons
import { ReactComponent as EyeIcon } from '../../../../assets/Icons/visibility_24px_outlined.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/Icons/delete_forever_24px_outlined.svg';

// Service
import { getAll, destroy } from '../../../../services/BlogService';

const Actions = styled.div`
    > svg{
        cursor: pointer;

        &:hover g path{
            fill: blue;
        }
    }    
`;

const CobaGrid2 = (props) => {
    console.log("GRID2");
    const { blogs, dispatch } = useContext(BlogContext);
    const { data: posts, isLoading } = blogs;
    let history = useHistory();

    useEffect(() => {
        console.log('useEffect CobaGrid2');
        if (posts.length === 0) {
            dispatch({ type: 'LOADING' });
            setTimeout(() => {
                try {
                    getAll().then(datas => {

                        const { data } = datas;

                        (data.length === 0) ? dispatch({ type: 'ERROR' }) : dispatch({ type: 'SET_BLOG', payload: data });
                    });
                } catch (error) {
                    console.log(error);
                }
            }, 500);
        }
    }, [dispatch, posts]);

    const edit = (id) => {
        history.push(`/post/editpost/${id}`);
    }

    const handleDelete = (id) => {
        try {
            const confirmValue = window.confirm('Akan menghapus data dengan id ' + id + ' ?');
            if (confirmValue) {
                destroy(id).then(data => {
                    dispatch({ type: 'DELETE', payload: id });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const memoizedHandleDelete = useCallback(handleDelete, []);

    return (
        <>
            {
                (isLoading) ? (<p>Loading...</p>) : (
                    <Grid
                        data={
                            posts.map((d, i) => {
                                let no = i+1;
                                return [
                                    no,
                                    d.title,
                                    _(
                                        <Actions>
                                            <EyeIcon onClick={() => edit(d.id)} />
                                            <DeleteIcon onClick={() => memoizedHandleDelete(d.id)} />
                                        </Actions>
                                    )
                                ];
                            })
                        }
                        columns={['No.', 'Title', { 
                            name: 'Actions',
                            sort: {
                                enabled: false
                            }
                        }]}
                        search={{
                            enabled: true
                        }}
                        sort={true}
                        pagination={{
                            enabled: true,
                            limit: 10,
                            summary: true
                        }}
                        language= {{
                            'search': {
                                'placeholder': '🔍 Search...'
                            },
                            'pagination': {
                                'previous': '⬅️',
                                'next': '➡️',
                                'showing': '😃 Displaying',
                                'results': () => 'Records'
                            }
                        }}
                    />
                )
            }
        </>
    );
}

export default CobaGrid2;