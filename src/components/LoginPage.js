import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/auth/login`, 
                {
                    username, password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const result = await res.data;
            
            return result;    
        } catch (error) {
            const result = await error.response;
            
            return result;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datas = await login();
        
        if ( datas.status === 422 ) {
            datas.data.map((err, i) => setError(err.msg) );
            return false;
        }

        if ( datas.errors === 'authentication failed' ) {
            setError(datas.msg);
            return false;
        }

        localStorage.setItem('access-token', datas.token);
        localStorage.setItem('refresh-token', datas.refreshToken);
        setError('');
        
        console.log('Login Success...');
        
    }

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Login Page</h3>
            
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsernameId">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formPasswordId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button type="submit" variant="success">Login</Button>
                </Form>
                <span>{ error }</span>
            </div>
        </div>
    );
}
 
export default LoginPage;