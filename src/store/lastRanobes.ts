import { create } from 'zustand';
import { Ranobe } from '../types/ranobe';
import { createSelectors } from './createSelectors';
import { getRanobes } from '../api/ranobes';
import { AxiosError } from 'axios';

interface GetLastRanobesState {
  ranobes: Ranobe[];
  isLoading: boolean;
  error: string | null;
  fetchLastRanobes: () => void;
}

const useLastRanobesStore = create<GetLastRanobesState>((set) => ({
  ranobes: [],
  isLoading: false,
  error: null,
  fetchLastRanobes: async () => {
    set({ isLoading: true, error: null });
    try {
      const ranobes = await getRanobes();
      set({ ranobes: ranobes.data });
    } catch (error) {
      set({ error: (error as AxiosError).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useLastRanobes = createSelectors(useLastRanobesStore);
