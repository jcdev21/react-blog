import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext';
import { Form, Button } from 'react-bootstrap';

// Services
import { update, getOne } from '../../../../services/UserService';

const EditUser = (props) => {

    const currentUserId = props.match.params.id;

    const { state, dispatch } = useContext(UserContext);
    const { users } = state;
    
    const [selectedUser, setSelectedUser] = useState({
        name: '',
    });

    const [levelChoise, setLevelChoise] = useState([
        {id: 1, value: 'admin', isChecked: false},
        {id: 2, value: 'member', isChecked: false},
    ]);

    const history = useHistory();

    useEffect(() => {
        const select = users.find(user => user.id === parseInt(currentUserId));
        setSelectedUser(select);
        
        if (select !== undefined) {
            setLvl(select.level);
        }

    }, [users, currentUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const level = [];

        for (const lc of levelChoise) {
            if (lc.isChecked === true) {
                level.push(lc.value);
            }
        }

        const dataForm = {
            name: selectedUser.name,
            level: level[0],
            is_active: 1
        };

        try {
            const result = await update(currentUserId, dataForm);
            console.log(result.data);
            if (result.data) {
                const resultData = await getOne(currentUserId);
                const { data } = resultData;

                const dataUpdated = {
                    ...selectedUser,
                    name: data.name,
                    level: data.level,
                    is_active: data.is_active
                }

                dispatch({ type: 'EDIT', payload: dataUpdated });
            }

        } catch (error) {
            console.log('gagal update data ' + error);
        }

        history.push('/user/home');
    }

    const handleOnChange = (userKey, value) => setSelectedUser({...selectedUser, [userKey]: value});

    const handleLevel = (e) => {
        const check = e.target.value;
        setLvl(check);
    }

    const setLvl = (check) => {
        setLevelChoise(current => {
            return current.map((cLevel) => {
                if (cLevel.value === check) {
                    return {...cLevel, isChecked: !cLevel.isChecked}
                }
    
                return cLevel;
            });
        });
    }

    return (
        <div>
            <h1>Edit Post</h1>

            {
                selectedUser ? (
                    <div style={{ marginTop: '30px' }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formNameId">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Name..." value={selectedUser.name} onChange={(e) => handleOnChange("name", e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="">
                                <Form.Label>Level</Form.Label>
                                {
                                    levelChoise.map((lc) => (
                                        <Form.Check type="checkbox" id={`id-${lc.value}`} value={lc.value} checked={lc.isChecked} onChange={handleLevel} label={lc.value} key={lc.id} />
                                    ))
                                }
                            </Form.Group>

                            <Button type="submit" variant="success">Submit</Button>
                        </Form>
                    </div>
                ) : (<p>Not Selected User</p>)
            }
        </div>
    );
}
 
export default EditUser;