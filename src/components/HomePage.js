import React, { useState, useEffect } from 'react';
import CardItem from './task/CardItem';
import axios from 'axios';

const HomePage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getAll().then(data => {
            setBlogs([...data]);
        });
    }, []);

    const getAll = async () => {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:8000/api`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await res.data;
        setIsLoading(false);
        
        return result.data;
    }

    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            {
                (isLoading) ? (
                    <p>Loading.......</p>
                ) : (
                    <CardItem items={blogs} />
                )
            }
        </div>
    );
}
 
export default HomePage;