import { SlimUser } from './auth';

export interface Comment {
  id: string;
  content: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: SlimUser;
}

export interface CommentTree extends Comment {
  children: CommentTree[];
}

export interface RanobesCommentUrl {
  commentType: 'ranobes';
  id: string;
}

export interface ChaptersCommentUrl {
  commentType: 'chapters';
  id: number;
}
