import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import styled from 'styled-components';
import AOS from 'aos';

const LoginWrapper = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardLogin = styled.div`
    background: #ffffff;
    margin: 5rem auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    height: 410px;
    width: 329px;
    padding: 12px 44px;

    .card-title {
        letter-spacing: 4px;
        padding-top: 13px;
        padding-bottom: 23px;
        text-align: center;

        .underline-title {
            background: -webkit-linear-gradient(right, #EFF5FF, #2A65EA);
            height: 3px;
            margin: 0.5rem auto 0 auto;
            width: 89px;
        }
    }
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FormGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;

    align-items: left;
    display: flex;
    flex-direction: column;

    label {
        font-size: 11pt;
    }

    .form-content {
        background: #ffffff;
        border: none;
        outline: none;
    }

    .form-border {
        background: -webkit-linear-gradient(right, #EFF5FF, #2A65EA);
        height: 1px;
        width: 100%;
    }
`;

const ButtonLogin = styled.button`
    background: #2A65EA;
    border: none;
    border-radius: 21px;
    box-shadow: 0px 1px 8px #3f9eeb;
    cursor: pointer;
    color: white;
    font-family: "Raleway SemiBold", sans-serif;
    height: 42.3px;
    margin: 0 auto;
    margin-top: 35px;
    transition: 0.25s;
    width: 153px;

    &:hover {
        box-shadow: 0px 1px 18px #3f9eeb;
    }
`;

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { token, dispatch } = useAuthContext();
    const history = useHistory();

    useEffect(() => {
        AOS.init({ duration: 300 });
        return () => AOS.refresh();
    }, []);

    const login = async () => {
        try {
            const res = await axios.post(`https://blog-api-jcdev.herokuapp.com/api/v1/auth/login`, 
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
        
        dispatch({ type: 'LOGIN', payload: datas.refreshToken });

        console.log('Login Success...');
        history.push('/');
        
    }



    if (token) {
        console.log('diredirect ke home, karena ada token');
        return ( <Redirect to="/" /> );
    }

    return (
        <LoginWrapper>
            <CardLogin data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="300">
                <div className="card-title">
                    <h2>LOGIN</h2>
                    <div className="underline-title"></div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="usernameId">Username</label>
                        <input
                            id="usernameId"
                            className="form-content"
                            type="text"
                            name="username"
                            autoComplete="on"
                            required 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <div className="form-border"></div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="passwordId">Password</label>
                        <input
                            id="passwordId"
                            className="form-content"
                            type="password"
                            name="password"
                            autoComplete="on"
                            required 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="form-border"></div>
                    </FormGroup>

                    <ButtonLogin type="submit">LOGIN</ButtonLogin>
                    { error && (<span style={{ marginTop: '10px', fontSize: '11pt'}} >{error}</span>) }
                </Form>
            </CardLogin>
        </LoginWrapper>
    );
}
 
export default Login;