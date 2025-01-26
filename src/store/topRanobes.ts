import { create } from 'zustand';
import { RanobeTop } from '../types/ranobe';
import { createSelectors } from './createSelectors';
import { getTopRanobes } from '../api/ranobes';
import { AxiosError } from 'axios';

interface GetTopRanobesState {
  ranobes: RanobeTop[];
  isLoading: boolean;
  error: string | null;
  fetchTopRanobes: () => void;
}

const useTopRanobesStore = create<GetTopRanobesState>((set) => ({
  ranobes: [],
  isLoading: false,
  error: null,
  fetchTopRanobes: async () => {
    set({ isLoading: true, error: null });
    try {
      const ranobes = await getTopRanobes();
      set({ ranobes: ranobes.data });
    } catch (error) {
      set({ error: (error as AxiosError).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useTopRanobes = createSelectors(useTopRanobesStore);
