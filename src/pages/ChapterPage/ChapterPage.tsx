import { Box, Divider } from '@mui/material';
import classes from './ChapterPage.module.css';
import CommentsList from '../../components/CommentsList';
import ReadChapter from '../../components/ReadChapter';
import { useParams } from 'react-router-dom';

const ChapterPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Ranobe ID is required');
  }

  return (
    <Box className={classes.mainContainer}>
      <ReadChapter />
      <Divider orientation="horizontal" />
      <CommentsList urlParams={{ commentType: 'ranobes', id }} />
    </Box>
  );
};

export default ChapterPage;
