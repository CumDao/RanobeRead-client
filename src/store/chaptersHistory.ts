import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ChapterHistory } from '../types/history';
import { CHAPTERS_HISTORY } from '../constants/keys';
import { createSelectors } from './createSelectors';

interface ChaptersHistoryState {
  chapters: Record<string, string>;
  saveNewChapter: (chapter: ChapterHistory) => void;
  getChapter: (ranobeId: string) => string | null;
}

const useChapterHistoryStore = create<ChaptersHistoryState>()(
  devtools(
    persist(
      (set, get) => ({
        chapters: {},
        saveNewChapter: (chapter: ChapterHistory) => {
          set(({ chapters }) => ({
            chapters: {
              ...chapters,
              [chapter.ranobeId]: chapter.chapterNumber,
            },
          }));
        },
        getChapter: (ranobeId: string) => get().chapters[ranobeId] || null,
      }),
      { name: CHAPTERS_HISTORY, version: 1 },
    ),
  ),
);

export const useChapterHistory = createSelectors(useChapterHistoryStore);
