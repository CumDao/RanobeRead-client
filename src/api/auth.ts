import { isRegisterRequest } from '../helpers/registerGuard';
import { setToken } from '../helpers/storageToken';
import { LoginRequest, LoginResponce, Profile, RegisterRequest } from '../types/auth';

import api from './axios';

export const auth = async (
  authData: LoginRequest | RegisterRequest,
  recaptcha?: string,
): Promise<Profile> => {
  const url = isRegisterRequest(authData) ? 'registration' : 'login';
  const headers = recaptcha ? { recaptcha: recaptcha } : {};
  const response = await api.post<LoginResponce>(`/auth/${url}`, authData, { headers });
  setToken(response.data.token);
  return response.data.user;
};

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<Profile>('/auth/profile');
  return response.data;
};
