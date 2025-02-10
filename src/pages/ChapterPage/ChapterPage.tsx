import { Box, Divider } from '@mui/material';
import classes from './ChapterPage.module.css';
import Comments from '../../components/Comments';
import ReadChapter from '../../components/ReadChapter';

const ChapterPage = () => {
  return (
    <Box className={classes.mainContainer}>
      <ReadChapter />
      <Divider orientation="horizontal" />
      <Comments />
    </Box>
  );
};

export default ChapterPage;
