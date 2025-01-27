import { GET_CHAPTER } from '../constants/url';
import { ChapterResponce, GetChapterRequest } from '../types/chapter';
import api from './axios';

export const getChapter = async (chapterParams: GetChapterRequest) => {
  const response = await api.get<ChapterResponce>(`${GET_CHAPTER}`, {
    params: chapterParams,
  });
  return response.data;
};
