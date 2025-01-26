import { CHAPTERS_HISTORY } from '../constants/keys';
import { ChapterHistory } from '../types/history';

export const setHistory = (chapter: ChapterHistory) =>
  localStorage.setItem(CHAPTERS_HISTORY, JSON.stringify(chapter));
