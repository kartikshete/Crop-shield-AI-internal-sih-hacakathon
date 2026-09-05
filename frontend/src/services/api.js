import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach language and optional JWT
api.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem('cropshield_lang') || 'en';
    config.headers['Accept-Language'] = lang;
    const token = localStorage.getItem('cropshield_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.warn('API call fallback or network notice:', error?.message);
    return Promise.reject(error);
  }
);

export default api;
