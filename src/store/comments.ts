import { create } from 'zustand';
import { ChaptersCommentUrl, Comment, RanobesCommentUrl } from '../types/comments';
import { createSelectors } from './createSelectors';
import { getComments } from '../api/comments';
import axios from 'axios';

interface GetCommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  fetchComments: ({ commentType, id }: RanobesCommentUrl | ChaptersCommentUrl) => void;
}

const useCommentsStore = create<GetCommentsState>()((set) => ({
  comments: [],
  isLoading: false,
  error: null,
  fetchComments: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const comments = await getComments(params);
      set({ comments: comments });
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.message : 'Неизвестная ошибка';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useComments = createSelectors(useCommentsStore);
