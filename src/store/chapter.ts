import { create } from 'zustand';
import { ChapterResponce, GetChapterRequest } from '../types/chapter';
import { getChapter } from '../api/chapters';
import { AxiosError } from 'axios';
import { createSelectors } from './createSelectors';

interface GetChapterState {
  chapter: ChapterResponce | null;
  isLoading: boolean;
  error: string | null;
  fetchChapter: (chapterParams: GetChapterRequest) => void;
}

const useChapterStore = create<GetChapterState>((set) => ({
  chapter: null,
  isLoading: false,
  error: null,
  fetchChapter: async (chapterParams: GetChapterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const chapter = await getChapter(chapterParams);
      set({ chapter: chapter });
    } catch (error) {
      set({ error: (error as AxiosError).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useChapter = createSelectors(useChapterStore);
