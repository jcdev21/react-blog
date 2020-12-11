import axios from 'axios';

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem('refresh-token') || null;
    return refreshToken;
}

export const logout = async () => {
    const refreshToken = localStorage.getItem('refresh-token');
    const res = await axios.get(`https://blog-api-jcdev.herokuapp.com/api/v1/auth/logout`, {
        headers: {
            "Authorization": `Bearer ${refreshToken}`,
            "Content-Type": "application/json"
        }
    });

    const result = await res.data;

    if (result.msg === 'success logout') {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        return true;
    }
    
    return false;
}

export default class AuthMiddleware {
    static init = () => {
        console.log('Auth Middleware');
        this.setInterceptors();
    }

    static delete = () => {
        this.destroyInterceptors();
    }

    static destroyInterceptors = () => {
        return axios.interceptors.response.eject();
    }

    static setInterceptors = () => {
        return axios.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('ada masalah');
            
            if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
                
                const refreshToken = localStorage.getItem('refresh-token');

                const RT = new Promise((resolve, reject) => {
                    axios.get(`https://blog-api-jcdev.herokuapp.com/api/v1/auth/refresh-token`, {
                        headers: {
                            "Authorization": `Bearer ${refreshToken}`,
                            "Content-Type": "application/json"
                        }
                    }).then((resRefreshToken => {
                        localStorage.removeItem('access-token');
                        console.log(resRefreshToken.data);
                        
                        resolve(resRefreshToken.data.token);
                    })).catch(eBro => {
                        reject(eBro);
                    });
                });


                return RT.then(token => {
                    localStorage.setItem('access-token', token);
                    console.log('tokennya : ' + token);
                    
                    const config = error.config;
                    config.headers['Authorization'] = `Bearer ${token}`;
                    
                    console.log(config.headers);
                    

                    return new Promise((resolve, reject) => {
                        console.log('nnnjnjnjnjnj');
                        

                        return axios.request(config)
                        .then(res => {
                            console.log('resol');
                            
                            resolve(res);
                        })
                        .catch(err => {
                            console.log('eject');
                            
                            reject(err);
                        });
                    });
                });
            }




            if (error.response && error.response.status === 403 && error.response.data.msg === 'user unauthenticated') {
                localStorage.clear();

                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }


            
            return Promise.reject(error);
        });
    };
}