import { TOKEN } from '../constants/keys';

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const setToken = (token: string) => localStorage.setItem(TOKEN, token);
