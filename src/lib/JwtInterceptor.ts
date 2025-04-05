import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL
const DEV=import.meta.env.VITE_DEV
const X_APP_TOKEN=import.meta.env.VITE_X_APP_TOKEN

const token=localStorage.getItem('auth_token') || null;
// Create an Axios instance
const http = axios.create({
  baseURL: BASE_URL, // Set the base URL
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    // Add headers to every request
    config.headers['Dev'] = DEV;
    config.headers['X-App-Token'] = X_APP_TOKEN;
    if(token!=null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default http;

