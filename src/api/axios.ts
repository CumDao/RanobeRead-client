import axios from 'axios';
import setupInterceptors from './setupInterceptors';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
});

setupInterceptors(api);

export default api;
