import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { getToken, removeToken } from '../helpers/storageToken';

const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
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
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status || 500;
      if (status === 401) removeToken();
      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
