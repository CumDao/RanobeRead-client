import { create } from 'zustand';
import { LoginRequest, Profile, RegisterRequest } from '../types/auth';
import { createSelectors } from './createSelectors';
import { auth, getProfile } from '../api/auth';
import axios from 'axios';
import { removeToken } from '../helpers/storageToken';
import { persist } from 'zustand/middleware';

interface AuthState {
  prevUrl: string;
  userData: Profile | null;
  isLoading: boolean;
  error: string | null;
  auth: (authData: LoginRequest | RegisterRequest, recaptcha?: string) => void;
  signOut: () => void;
  clearError: () => void;
  setPrevUrl: (prevUrl: string) => void;
  getProfile: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      prevUrl: '/',
      userData: null,
      isLoading: false,
      error: null,
      auth: async (authData: LoginRequest | RegisterRequest, recaptcha?: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await auth(authData, recaptcha);
          set({ userData: user });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({ error: error.response?.data.message });
          } else {
            set({ error: 'Неизвестная ошибка' });
          }
        } finally {
          set({ isLoading: false });
        }
      },
      clearError() {
        set({ error: null });
      },
      signOut() {
        removeToken();
        set({ userData: null });
      },
      setPrevUrl(prevUrl: string) {
        set({ prevUrl: prevUrl });
      },
      getProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const user = await getProfile();
          set({ userData: user });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({ error: error.response?.data.message });
          } else {
            set({ error: 'Неизвестная ошибка' });
          }
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'authStore',
      partialize: (state) => ({ prevUrl: state.prevUrl }),
    },
  ),
);

export const useAuth = createSelectors(useAuthStore);
