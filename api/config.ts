import axios from 'axios';
import { getClerkInstance } from '@clerk/clerk-expo'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.68.71:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const clerk = getClerkInstance();
    const token = await clerk.session?.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('Failed to attach token to request:', err);
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'An unexpected error occurred';
    return Promise.reject({ ...error, message });
  }
);


export default api;
