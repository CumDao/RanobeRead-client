import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChapterResponce } from '../../types/chapter';
import { fetchChapter } from '../middleware/ChapterThunk';

export interface GetChapterState {
  chapter: ChapterResponce | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GetChapterState = {
  chapter: null,
  isLoading: false,
  error: null,
};

export const getChapterSlice = createSlice({
  name: 'chapter/get',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchChapter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChapter.fulfilled, (state, action: PayloadAction<ChapterResponce>) => {
        state.isLoading = false;
        state.chapter = action.payload;
      })
      .addCase(fetchChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || 'Error';
      });
  },
});

export default getChapterSlice.reducer;
