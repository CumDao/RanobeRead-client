import { LoginRequest, RegisterRequest } from '../types/auth';

export const isRegisterRequest = (
  data: LoginRequest | RegisterRequest,
): data is RegisterRequest => {
  return (data as RegisterRequest).login !== undefined;
};
