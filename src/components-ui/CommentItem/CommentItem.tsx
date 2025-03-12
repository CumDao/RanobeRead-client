import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classes from './CommentItem.module.css';
import { CommentTree } from '../../types/comments';
import Avatar from '../Avatar';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import CommentEditor from '../CommentEditor';

interface CommentItemProps {
  comment: CommentTree;
  level: number;
  handleOpenAnswer: (id: string) => void;
  activeCommentId: string | null;
  handleCancelAnswer: () => void;
  onSubmit: (content: string, parentId?: string) => void;
}

const CommentItem = ({
  comment,
  level,
  handleOpenAnswer,
  activeCommentId,
  handleCancelAnswer,
  onSubmit,
}: CommentItemProps) => {
  const handleAnswer = () => {
    handleOpenAnswer(comment.id);
  };

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ru });
  return (
    <Box className={classes.commentItem} style={{ marginLeft: level * 12 }}>
      <Box display="flex" alignItems="center" className={classes.header}>
        <Avatar size="small" avatarUrl={comment.user.avatarUrl} login={comment.user.login} />
        <Typography variant="subtitle2" className={classes.username}>
          {comment.user.login}
        </Typography>
        <Typography variant="caption" className={classes.time}>
          {timeAgo}
        </Typography>
      </Box>
      <Typography variant="body1" className={classes.content}>
        {comment.content}
      </Typography>
      {activeCommentId !== comment.id ? (
        <button onClick={handleAnswer} className={classes.answer}>
          Ответить
        </button>
      ) : (
        <CommentEditor onSubmit={onSubmit} parentId={comment.id} onCancel={handleCancelAnswer} />
      )}
      {comment.children && comment.children.length > 0 && (
        <Box className={classes.children}>
          {comment.children.map((child) => (
            <CommentItem
              handleOpenAnswer={handleOpenAnswer}
              key={child.id}
              comment={child}
              level={level + 1}
              activeCommentId={activeCommentId}
              handleCancelAnswer={handleCancelAnswer}
              onSubmit={onSubmit}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentItem;
