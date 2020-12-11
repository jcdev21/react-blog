import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../../../../contexts/UserContext';

// Grid
import { Grid, _ } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

// Icons
import { ReactComponent as EyeIcon } from '../../../../../assets/Icons/visibility_24px_outlined.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Icons/delete_forever_24px_outlined.svg';

// Services
import { getAll, destroy } from '../../../../../services/UserService';

const Actions = styled.div`
    > svg{
        cursor: pointer;

        &:hover g path{
            fill: blue;
        }
    }    
`;

const TableUser = () => {

    const { state, dispatch } = useContext(UserContext);
    const { users, isLoading } = state;

    const history = useHistory();

    useEffect(() => {
        if (users.length === 0) {
            dispatch({ type: 'LOADING' });
            setTimeout(() => {
                getAll().then(datas => {
                    const { data, error } = datas;

                    if (error) {
                        dispatch({ type: 'ERROR' });
                    } else {
                        dispatch({ type: 'SET_USER', payload: data });
                    }
                })
            }, 500);
        }
    }, [users, dispatch]);

    const handleEdit = (id) => {
        history.push('/user/edit/' + id);
    }

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm('Akan menghapus user dengan id' + id + ' ?');

            if (confirmDelete) {
                await destroy(id).then(data => {
                    dispatch({ type: 'DELETE', payload: id });
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
    const memoizedHandleDelete = useCallback(handleDelete, []);

    return (
        <div>
            {
                (isLoading) ? (<p>Loading...</p>) : (
                    <Grid 
                        data={
                            users.map((user, i) => {
                                let no = i+1;
                                return [
                                    no,
                                    user.name,
                                    user.username,
                                    user.level,
                                    _(
                                        <Actions>
                                            <EyeIcon onClick={() => handleEdit(user.id)} />
                                            <DeleteIcon onClick={() => memoizedHandleDelete(user.id, i)} />
                                        </Actions>
                                    )
                                ];
                            })
                        }
                        columns={['No.', 'Name', 'Username', 'level', {
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
                            limit: 5,
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
        </div>
    );
}

export default TableUser;