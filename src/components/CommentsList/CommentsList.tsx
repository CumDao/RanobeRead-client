import Typography from '@mui/material/Typography';
import CommentItem from '../../components-ui/CommentItem/CommentItem';
import buildCommentTree from '../../helpers/commentTree';
import { useComments } from '../../store/comments';
import classes from './CommentsList.module.css';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import CommentEditor from '../../components-ui/CommentEditor';
import { useEffect, useState } from 'react';
import { ChaptersCommentUrl, RanobesCommentUrl } from '../../types/comments';

interface CommentsListProps {
  urlParams: RanobesCommentUrl | ChaptersCommentUrl;
}

const CommentsList = ({ urlParams }: CommentsListProps) => {
  const comments = useComments.use.comments();
  const isLoading = useComments.use.isLoading();
  const error = useComments.use.error();
  const theme = useTheme();
  const useCreateComment = useComments.use.createComment();
  const isAuth = useAuth.use.isAuthenticated();
  const useClearComments = useComments.use.clearComments();

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  useEffect(() => {
    () => {
      useClearComments();
    };
  }, []);

  const handleAnswer = (id: string) => {
    if (!isAuth) {
      toast.error('Пожалуйста, авторизуйтесь!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode,
      });
    } else {
      setActiveCommentId(id);
    }
  };

  const handleCancelAnswer = () => setActiveCommentId(null);

  const handleSubmit = (content: string, parentId?: string) => {
    useCreateComment(urlParams, {
      content,
      parentId,
    });
    handleCancelAnswer();
  };

  const commentTree = buildCommentTree(comments);

  if (isLoading) {
    return <div>Загрузка комментариев...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <Box className={classes.commentsContainer}>
      <div>
        {activeCommentId === 'new' ? (
          <CommentEditor onSubmit={handleSubmit} onCancel={handleCancelAnswer} />
        ) : (
          <div
            className={classes.mock}
            onClick={() => {
              handleAnswer('new');
            }}
          >
            Написать комментарий...
          </div>
        )}
      </div>
      {commentTree.length === 0 ? (
        <Typography>Нет комментариев</Typography>
      ) : (
        commentTree.map((comment) => (
          <CommentItem
            handleOpenAnswer={handleAnswer}
            key={comment.id}
            comment={comment}
            level={0}
            activeCommentId={activeCommentId}
            handleCancelAnswer={handleCancelAnswer}
            onSubmit={handleSubmit}
          />
        ))
      )}
    </Box>
  );
};

export default CommentsList;
