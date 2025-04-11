
import axios from 'axios';
import { getEnvVariable } from '../utils/envUtils';

const BASE_URL = getEnvVariable('BASE_URL');
const X_APP_TOKEN = getEnvVariable('X_APP_TOKEN');

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  allowAbsoluteUrls: true,
});

// Request interceptor
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
