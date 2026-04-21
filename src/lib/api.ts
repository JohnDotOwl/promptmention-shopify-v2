import axios from 'axios';
import { getShopifyIdToken } from '@/lib/shopify';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const sessionToken = await getShopifyIdToken();
  if (sessionToken) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export { apiClient };
