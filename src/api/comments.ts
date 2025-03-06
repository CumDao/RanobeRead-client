import { ChaptersCommentUrl, Comment, RanobesCommentUrl } from '../types/comments';
import api from './axios';

export const getComments = async ({
  commentType,
  id,
}: RanobesCommentUrl | ChaptersCommentUrl): Promise<Comment[]> => {
  const responce = await api.get<Comment[]>(`${commentType}/${id}/comments`);
  return responce.data;
};
