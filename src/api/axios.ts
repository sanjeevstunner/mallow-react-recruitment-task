import { ENV } from '@/constants/environment';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosService {
  private static instance: AxiosInstance = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: 1000 * 30,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ENV.API_KEY

    },
  });

  // Attach token to every request if present
  static {
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    // Response interceptor for error handling (optional, can be expanded)
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Optionally handle global errors here
        return Promise.reject(error);
      }
    );
  }

  static get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  static post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  static put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  static patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  static delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default AxiosService; 