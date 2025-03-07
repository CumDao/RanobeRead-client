import { Box, Button, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import classes from './CommentEditor.module.css';

interface CommentEditorProps {
  onSubmit: (content: string) => void;
}

const CommentEditor = ({ onSubmit }: CommentEditorProps) => {
  const [commentText, setCommentText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = commentText;
    const selection = text.substring(start, end);

    const newText = text.substring(0, start) + before + selection + after + text.substring(end);
    setCommentText(newText);

    // Update cursor position
    const newCursorPos = start + before.length + selection.length + after.length;
    setTimeout(() => {
      textarea.selectionStart = newCursorPos;
      textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  const handleBold = () => insertText('**', '**');
  const handleItalic = () => insertText('*', '*');
  const handleLink = () => {
    const url = prompt('Введите URL:');
    if (url) insertText('[', `](${url})`);
  };

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <Box className={classes.editorContainer}>
      <div className={classes.toolbar}>
        <Button size="small" onClick={handleBold} title="Жирный" className={classes.formatButton}>
          <FormatBoldIcon fontSize="small" />
        </Button>
        <Button size="small" onClick={handleItalic} title="Курсив" className={classes.formatButton}>
          <FormatItalicIcon fontSize="small" />
        </Button>
        <Button size="small" onClick={handleLink} title="Ссылка" className={classes.formatButton}>
          <LinkIcon fontSize="small" />
        </Button>
      </div>

      <TextField
        inputRef={(ref) => {
          if (ref) textareaRef.current = ref.querySelector('textarea');
        }}
        multiline
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        minRows={3}
        placeholder="Напишите комментарий..."
        variant="outlined"
        className={classes.textField}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.submitButton}
        disabled={!commentText.trim()}
      >
        Отправить
      </Button>
    </Box>
  );
};

export default CommentEditor;
