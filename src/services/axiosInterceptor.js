
import axios from 'axios';
// Import environment variables
const DEV = import.meta.env.VITE_DEV; 
const X_APP_TOKEN = import.meta.env.VITE_X_APP_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('auth_token') || null;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add headers to every request
    config.headers['Dev'] = DEV;
    config.headers['X-App-Token'] = X_APP_TOKEN;
    if(token != null) {
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
