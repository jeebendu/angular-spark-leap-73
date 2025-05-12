
import axios, { AxiosInstance } from 'axios';
import { HttpClientInterface } from '../../../core/services/HttpClient';
// AsyncStorage would be imported from React Native
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Mobile implementation of the HttpClient
export class MobileHttpClient implements HttpClientInterface {
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
      async (config) => {
        try {
          // This would use AsyncStorage in a real implementation
          // const token = await AsyncStorage.getItem('auth_token');
          const token = null; // Placeholder
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error accessing storage:', error);
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
          // AsyncStorage.removeItem('auth_token');
          console.log('Unauthorized: Please log in again');
          // Navigation to login screen would happen here in a real app
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
