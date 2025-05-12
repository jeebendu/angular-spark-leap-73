
// Abstract HTTP client interface that can be implemented for different platforms
export interface HttpClientInterface {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
}

// Factory to create the appropriate HTTP client based on platform
export const createHttpClient = (): HttpClientInterface => {
  // In a real implementation, this would detect the platform and return the appropriate client
  // For now, we'll just return a placeholder that will be replaced by platform-specific implementations
  throw new Error('createHttpClient must be implemented by platform');
};
