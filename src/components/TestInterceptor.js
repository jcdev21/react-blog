import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthMiddleware from '../middleware/AuthMiddleware';
import CardItem from './task/CardItem';

const TestInterceptor = () => {

    AuthMiddleware.init();

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getAll().then(data => {
            console.log(data);
            setBlogs([...data]);
        }).catch(error => {
            setBlogs([]);
        });

        return () => AuthMiddleware.delete();
    }, []);

    const getAll = () => {

        const accessToken = localStorage.getItem('access-token');

        if (!accessToken) {
            return Promise.reject();
        }

        return axios.get(`http://localhost:8000/api/v1/blog`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log('oke');
            return res.data.data;
        });
    }

    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <CardItem items={blogs} />
        </div>
    );
}
 
export default TestInterceptor;