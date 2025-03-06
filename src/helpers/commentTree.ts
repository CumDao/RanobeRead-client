import { Comment, CommentTree } from '../types/comments';

const buildCommentTree = (commentsList: Comment[]): CommentTree[] => {
  const comments: CommentTree[] = commentsList.map((comment) => ({
    id: comment.id,
    content: comment.content,
    parentId: comment.parentId,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    user: comment.user,
    children: [],
  }));

  const map: Record<string, CommentTree> = {};
  const roots: CommentTree[] = [];

  comments.forEach((comment) => {
    comment.children = [];
    map[comment.id] = comment;
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      const parent = map[comment.parentId];
      if (parent) {
        parent.children.push(comment);
      } else {
        roots.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
};

export default buildCommentTree;
