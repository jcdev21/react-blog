import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../../../contexts/UserContext';

// Services
import { store } from '../../../../services/UserService';

const style = {
    marginTop: '50px',
    width: '100%',
    minHeight: '100vh'
}

const AddUser = () => {

    const { dispatch } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const [levelChoise, setLevelChoise] = useState([
        {id: 1, value: 'admin', isChecked: false},
        {id: 2, value: 'member', isChecked: false},
    ]);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const level = [];

        for (const lc of levelChoise) {
            if (lc.isChecked === true) {
                level.push(lc.value);
            }
        }

        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('name', name);
        formData.append('level', level[0]);
        formData.append('photo', image);
        formData.append('email', email);
        formData.append('is_active', 1);
        
        try {
            const result = await store(formData);
            const { data } = result;
            
            dispatch({ type: 'CREATE', payload: data });

            history.push('/user/home');
        } catch (error) {
            console.log('Gagal add user, with error : ' + error);        
        }
    }

    const handleChangeImage = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const handleLoadImage = () => {
        URL.revokeObjectURL(previewImage);
    }

    const handleLevel = (e) => {
        const check = e.target.value;

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
        <div style={style}>
            <h1>Add User</h1>
            

            <div style={{ marginTop: '30px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsernameId">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formPasswordId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPasswordId">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formNameId">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formEmailId">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Level</Form.Label>
                        {
                            levelChoise.map((lc) => (
                                <Form.Check type="checkbox" id={`id-${lc.value}`} value={lc.value} checked={lc.isChecked} onChange={handleLevel} label={lc.value} key={lc.id} />
                            ))
                        }
                    </Form.Group>

                    <Form.Group>
                        <img src={previewImage} onLoad={handleLoadImage} style={{ width: '250px' }} alt="" />
                        <Form.File id="exampleFormControlFile1" label="Image" onChange={handleChangeImage} />
                    </Form.Group>

                    

                    <Button type="submit" variant="success">Submit</Button>
                </Form>
            </div>
        </div>
    );
}
 
export default AddUser;