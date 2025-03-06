import { MouseEventHandler } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classes from './CommentItem.module.css';
import { CommentTree } from '../../types/comments';
import Avatar from '../Avatar';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CommentItemProps {
  comment: CommentTree;
  level: number;
  handleAnswer: MouseEventHandler<HTMLButtonElement>;
}

const CommentItem = ({ comment, level, handleAnswer }: CommentItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ru });
  return (
    <Box className={classes.commentItem} style={{ marginLeft: level * 20 }}>
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
      <button onClick={handleAnswer} className={classes.answer}>
        Ответить
      </button>
      {comment.children && comment.children.length > 0 && (
        <Box className={classes.children}>
          {comment.children.map((child) => (
            <CommentItem
              handleAnswer={handleAnswer}
              key={child.id}
              comment={child}
              level={level + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentItem;
