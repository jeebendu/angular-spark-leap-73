
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const X_APP_TOKEN = import.meta.env.VITE_X_APP_TOKEN;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add headers to every request
    config.headers['X-App-Token'] = X_APP_TOKEN;
    
    // Get token from localStorage if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
