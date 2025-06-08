import { create } from 'zustand';
import { AxiosError } from 'axios';
import { createSelectors } from './createSelectors';
import { RanobeDetails } from '../types/ranobe';
import { getRanobeById } from '../api/ranobes';

interface GetRanobeState {
  ranobe: RanobeDetails | null;
  isLoading: boolean;
  error: string | null;
  fetchRanobe: (id: string) => void;
}

const useRanobeStore = create<GetRanobeState>()((set) => ({
  ranobe: null,
  isLoading: false,
  error: null,
  fetchRanobe: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const ranobe = await getRanobeById(id);
      set({ ranobe: ranobe.data });
    } catch (error) {
      set({ error: (error as AxiosError).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useRanobe = createSelectors(useRanobeStore);
