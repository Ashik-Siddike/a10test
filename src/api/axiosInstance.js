import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5002/api/v1',
    timeout: 10000, // Increased timeout
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: status => status >= 200 && status < 500 // Handle only 5xx as errors
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNREFUSED') {
            toast.error('Cannot connect to server. Please try again later.');
            return Promise.reject(new Error('Server is not responding'));
        }

        if (error.code === 'ECONNABORTED') {
            toast.error('Request timed out. Please try again.');
            return Promise.reject(new Error('Request timed out'));
        }

        const message = error.response?.data?.message || error.message || 'Something went wrong';
        toast.error(message);
        return Promise.reject(error);
    }
);

export default axiosInstance;