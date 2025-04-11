
import axios from 'axios';
import { getEnvVariable } from '../utils/envUtils';

const BASE_URL = 'https://ef0a-2409-4089-299-fd06-d0a9-6418-b93-dbcc.ngrok-free.app';
const X_APP_TOKEN = getEnvVariable('X_APP_TOKEN');

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  allowAbsoluteUrls: true,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Add headers to every request
    config.headers['Accept'] = 'application/json';
    config.headers['ngrok-skip-browser-warning'] = '1';
    config.headers['X-App-Token'] = X_APP_TOKEN;

    // Add token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
