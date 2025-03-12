import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import classes from './CommentEditor.module.css';
import { useComments } from '../../store/comments';

interface CommentEditorProps {
  onSubmit: (content: string, parentId?: string) => void;
  parentId?: string;
  onCancel?: () => void;
}

const CommentEditor = ({ onSubmit, parentId, onCancel }: CommentEditorProps) => {
  const isLoading = useComments.use.isLoadingCreate();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText, parentId);
      handleClear();
    }
  };
  const handleClear = () => {
    setCommentText('');
  };

  return (
    <Box className={classes.editorContainer}>
      <TextField
        multiline
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        minRows={3}
        placeholder="Напишите комментарий..."
        variant="outlined"
        className={classes.textField}
      />
      <div className={classes.submitGroup}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="info"
          className={classes.submitButton}
          disabled={!commentText.trim()}
          loading={isLoading}
        >
          Отправить
        </Button>
        <Button
          onClick={onCancel ?? handleClear}
          variant="contained"
          color="error"
          className={classes.submitButton}
        >
          Отменить
        </Button>
      </div>
    </Box>
  );
};

export default CommentEditor;
