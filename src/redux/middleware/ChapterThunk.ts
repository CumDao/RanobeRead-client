import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChapterResponce, GetChapterRequest } from '../../types/chapter';
import { AxiosError } from 'axios';
import { getChapter } from '../../api/chapters';

export const fetchChapter = createAsyncThunk<
  ChapterResponce,
  GetChapterRequest,
  { rejectValue: string }
>('chapter/get', async (chapterParams, { rejectWithValue }) => {
  try {
    return await getChapter(chapterParams);
  } catch (error) {
    return rejectWithValue((error as AxiosError).message);
  }
});
