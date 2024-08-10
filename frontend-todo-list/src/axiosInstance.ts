import axios from 'axios';
import { useAuth } from './hooks/useAuth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
    config => {
        const { token, tokenExpiry, logout } = useAuth();
        const currentTime = Date.now();

        if (token && tokenExpiry && currentTime >= tokenExpiry) {
            logout();
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
