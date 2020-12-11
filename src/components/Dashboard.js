import React, { useState, useEffect } from 'react';
import CardItem from './task/CardItem';
import axios from 'axios';

const Dashboard = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getAll().then(data => {
            setBlogs([...data]);
        }).catch(error => {
            setBlogs([]);
        });
    }, []);

    const getAll = async () => {

        const accessToken = localStorage.getItem('access-token');

        if (!accessToken) {
            return Promise.reject();
        }
        console.log('oke');
        
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/blog`, {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json"
                }
            });

            const result = await res.data;
            return result.data;    
        } catch (error) {
            console.log(error.response);
            
            const { status } = error.response;
            
            if (status === 401) {
                const refreshToken = localStorage.getItem('refresh-token');

                const res = await axios.get(`http://localhost:8000/api/v1/auth/refresh-token`, {
                    headers: {
                        "authorization": "Bearer " + refreshToken,
                        "Content-Type": "application/json"
                    }
                });

                const result = await res.data;
                
                if (result) {
                    localStorage.removeItem('access-token');    
                }

                localStorage.setItem('access-token', result.token);
                console.log(result);
            }
            
        }
    }

    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <CardItem items={blogs} />
        </div>
    );
}
 
export default Dashboard;