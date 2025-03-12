import {
  ChaptersCommentUrl,
  Comment,
  CreateCommentRequest,
  RanobesCommentUrl,
} from '../types/comments';
import api from './axios';

export const getComments = async ({
  commentType,
  id,
}: RanobesCommentUrl | ChaptersCommentUrl): Promise<Comment[]> => {
  const responce = await api.get<Comment[]>(`${commentType}/${id}/comments`);
  return responce.data;
};

export const createComment = async (
  { commentType, id }: RanobesCommentUrl | ChaptersCommentUrl,
  createCommentData: CreateCommentRequest,
): Promise<Comment> => {
  const responce = await api.post<Comment>(`${commentType}/${id}/comments`, createCommentData);
  return responce.data;
};
