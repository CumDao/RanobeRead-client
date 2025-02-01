import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChapterHistory } from '../types/history';
import { CHAPTERS_HISTORY } from '../constants/keys';
import { createSelectors } from './createSelectors';
import { MAX_HISTORY_ENTRIES } from '../constants/settings';

interface ChapterHistoryEntity {
  chapterNumber: number;
  updatedAt: number;
  ranobeName: string;
  image: string;
}

interface ChaptersHistoryState {
  chapters: Record<string, ChapterHistoryEntity>;
  saveNewChapter: (chapter: ChapterHistory) => void;
  getChapterById: (ranobeId: string) => number | null;
  clearHistory: () => void;
  removeChapterById: (ranobeId: string) => void;
}

const useChapterHistoryStore = create<ChaptersHistoryState>()(
  persist(
    (set, get) => ({
      chapters: {},
      saveNewChapter: (chapter: ChapterHistory) => {
        set(({ chapters }) => {
          const updatedChapters = {
            ...chapters,
            [chapter.ranobeId]: {
              chapterNumber: chapter.chapterNumber,
              updatedAt: Date.now(),
              ranobeName: chapter.ranobeName,
              image: chapter.image,
            },
          };
          if (Object.entries(updatedChapters).length > MAX_HISTORY_ENTRIES) {
            const oldestKey = Object.keys(updatedChapters).reduce((oldest, key) =>
              updatedChapters[key].updatedAt < updatedChapters[oldest].updatedAt ? key : oldest,
            );
            delete updatedChapters[oldestKey];
          }
          return { chapters: updatedChapters };
        });
      },
      getChapterById: (ranobeId: string) => get().chapters[ranobeId]?.chapterNumber || null,
      clearHistory: () => set({ chapters: {} }),
      removeChapterById: (ranobeId: string) => {
        set((state) => {
          const { chapters } = state;
          if (!(ranobeId in chapters)) return { chapters };

          const updatedChapters = { ...chapters };
          delete updatedChapters[ranobeId];

          return { chapters: updatedChapters };
        });
      },
    }),
    {
      name: CHAPTERS_HISTORY,
      version: 2,
      migrate: (persistedState, version) => {
        if (version < 2) {
          return { chapters: {} };
        }
        return persistedState;
      },
    },
  ),
);

export const useChapterHistory = createSelectors(useChapterHistoryStore);
