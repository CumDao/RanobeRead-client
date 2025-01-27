import { RootState } from '../reducers/rootReducer';

export const selectChapterError = (state: RootState) => state.getChapter.error;

export const selectChapterLoading = (state: RootState) => state.getChapter.isLoading;

export const selectChapterData = (state: RootState) => state.getChapter.chapter;
