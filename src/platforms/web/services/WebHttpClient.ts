
import axios, { AxiosInstance } from 'axios';
import { HttpClientInterface } from '../../../core/services/HttpClient';

// Web implementation of the HttpClient
export class WebHttpClient implements HttpClientInterface {
  private client: AxiosInstance;

  constructor(baseURL: string = 'https://api.example.com') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Request interceptor to add JWT token to headers
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common response patterns
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('auth_token');
          console.log('Unauthorized: Please log in again');
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: any): Promise<T> {
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.client.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    return this.client.delete<T>(url, config);
  }
}
