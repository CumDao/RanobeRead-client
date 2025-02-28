import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { getToken, removeToken, setToken } from '../helpers/storageToken';
import { refresh } from './auth';

const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      const status = error.response?.status || 500;
      if (status === 401 && originalRequest) {
        try {
          const token = await refresh();
          setToken(token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          removeToken();
        }
      }
      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
