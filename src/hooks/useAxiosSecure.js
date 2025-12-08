import { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { AuthContext } from '../context/AuthContext';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { user, logout, loading ,getFirebaseToken} = use(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        const requestInterceptor = axiosInstance.interceptors.request.use(
            async config => {
                if (user) {
                    const token = await getFirebaseToken(); 
                    if (token) {config.headers.Authorization = `Bearer ${token}`; }}
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            res => res,
            async err => {
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
        
    }, [user, logout, navigate, loading]); 

    return axiosInstance;
};

export default useAxiosSecure;