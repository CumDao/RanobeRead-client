import Typography from '@mui/material/Typography';
import CommentItem from '../../components-ui/CommentItem/CommentItem';
import buildCommentTree from '../../helpers/commentTree';
import { useComments } from '../../store/comments';
import classes from './Comments.module.css';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import CommentEditor from '../../components-ui/CommentEditor';

const Comments = () => {
  const comments = useComments.use.comments();
  const isLoading = useComments.use.isLoading();
  const error = useComments.use.error();
  const theme = useTheme();
  const isAuth = useAuth.use.isAuthenticated()();

  const handleAnswer = () => {
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
      console.log('ok');
    }
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
      {isAuth && <CommentEditor onSubmit={handleAnswer} />}
      {commentTree.length === 0 ? (
        <Typography>Нет комментариев</Typography>
      ) : (
        commentTree.map((comment) => (
          <CommentItem handleAnswer={handleAnswer} key={comment.id} comment={comment} level={0} />
        ))
      )}
    </Box>
  );
};

export default Comments;
