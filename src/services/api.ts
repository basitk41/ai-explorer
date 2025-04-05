import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);
const api = axios.create({
  // baseURL: API_URL || 'http://212.132.93.153:3000', // for ubantu server
  baseURL: API_URL || 'http://localhost:3000', // for local server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
