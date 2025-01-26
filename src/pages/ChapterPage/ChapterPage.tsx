import { Box, Button, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { selectChapterData } from '../../redux/selectors/getChapter';
import classes from './ChapterPage.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

const ChapterPage = () => {
  const chapter = useAppSelector(selectChapterData);
  // const isLoading = useAppSelector(selectChapterLoading);

  if (!chapter) {
    throw new Error('Chapter number is required');
  }

  return (
    <Box className={classes.mainContainer}>
      <Typography variant="h4" className={classes.chapterTitle}>
        {`${chapter.chapterName}`}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" className={classes.updatedAt}>
        Последнее обновление: {formatDate(chapter.updatedAt)}
      </Typography>
      <Typography variant="body1" className={classes.chapterText}>
        {chapter.chapterText}
      </Typography>
      <Box className={classes.navigation}>
        <Button
          variant="outlined"
          color="primary"
          disabled={chapter.chapterNumber === 1}
          component={Link}
          to={`/chapters/${chapter.ranobe.id}/${chapter.chapterNumber - 1}`}
        >
          Предыдущая глава
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          disabled={chapter.isLast}
          component={Link}
          to={`/chapters/${chapter.ranobe.id}/${chapter.chapterNumber + 1}`}
        >
          Следующая глава
        </Button>
      </Box>
    </Box>
  );
};

export default ChapterPage;
