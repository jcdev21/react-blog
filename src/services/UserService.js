import axios from 'axios';

const baseUrl = 'https://blog-api-jcdev.herokuapp.com/';

const getAll = async () => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        return Promise.reject();
    }
    
    const res = await axios.get(`${baseUrl}api/v1/users`, {
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
    });
    
    const result = await res.data;
    
    return result;
}

const getOne = async (id) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        return Promise.reject();
    }
    
    const res = await axios.get(`${baseUrl}api/v1/users/${id}`, {
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
    });
    
    const result = await res.data;
    
    return result;
}

const store = async (data) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        return Promise.reject();
    }
    
    const res = await axios.post(`${baseUrl}api/v1/users`, data, {
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "multipart/form-data"
        }
    });
    
    const result = await res.data;
    
    return result;
}

const update = async (id, data) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        return Promise.reject();
    }
    
    const res = await axios.put(`${baseUrl}api/v1/users/${id}`, data, {
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
    });
    
    const result = await res.data;
    
    return result;
}

const destroy = async (id) => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
        return Promise.reject();
    }

    const res = await axios.delete(`${baseUrl}api/v1/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    const result = await res.data;

    return result;
}

export { getAll, getOne, store, update, destroy };