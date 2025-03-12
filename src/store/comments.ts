import { create } from 'zustand';
import {
  ChaptersCommentUrl,
  Comment,
  CreateCommentRequest,
  RanobesCommentUrl,
} from '../types/comments';
import { createSelectors } from './createSelectors';
import { createComment, getComments } from '../api/comments';
import axios from 'axios';
import { useAuth } from './auth';

interface GetCommentsState {
  comments: Comment[];
  isLoading: boolean;
  isLoadingCreate: boolean;
  error: string | null;
  errorCreate: string | null;
  fetchComments: (params: RanobesCommentUrl | ChaptersCommentUrl) => void;
  createComment: (
    params: RanobesCommentUrl | ChaptersCommentUrl,
    createCommentData: CreateCommentRequest,
  ) => void;
  clearComments(): void;
}

const useCommentsStore = create<GetCommentsState>()((set, get) => ({
  comments: [],
  isLoading: false,
  isLoadingCreate: false,
  error: null,
  errorCreate: null,
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
  createComment: async (urlParams, createCommentData) => {
    set({ isLoadingCreate: true, error: null });
    try {
      const comment = await createComment(urlParams, createCommentData);
      const user = useAuth.getState().userData;
      comment.user = {
        id: user!.id,
        login: user!.login,
        avatarUrl: user!.avatarUrl,
      };
      set({ comments: [...get().comments, comment] });
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.message : 'Неизвестная ошибка';
      set({ errorCreate: message });
    } finally {
      set({ isLoadingCreate: false });
    }
  },
  clearComments() {
    set({ comments: [] });
  },
}));

export const useComments = createSelectors(useCommentsStore);
