import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import classes from './ChapterPage.module.css';
import { formatDate } from '../../helpers/dateUtils';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DOMPurify from 'dompurify';
import Breadcrumbs, { BreadcrumbItem } from '../../components-ui/Breadcrumbs/Breadcrumbs';
import PageSwitcher from '../../components/PageSwitcher';
import Comments from '../../components/Comments';
import { useChapter } from '../../store/chapter';
import { useChapterHistory } from '../../store/chaptersHistory';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import useScrollParagraph from '../../hooks/useScrollParagraph';
import { useBeforeUnload } from 'react-router-dom';

const ChapterPage = () => {
  const currentProgress = useRef<number | null>(null);
  const chapter = useChapter.use.chapter();
  const isLoading = useChapter.use.isLoading();
  const chapterHistorySave = useChapterHistory.use.saveNewChapter();
  const getSavedProgress = useChapterHistory.use.getProgress();

  const saveProgress = useCallback(() => {
    if (!chapter) return;
    chapterHistorySave({
      ranobeName: chapter.ranobe.nameFirst,
      chapterNumber: chapter.chapterNumber,
      ranobeId: chapter.ranobe.id,
      image: chapter.ranobe.image,
      progress: currentProgress?.current ?? 0,
    });
  }, [chapter, chapterHistorySave]);

  useBeforeUnload(saveProgress);

  useEffect(() => {
    return () => saveProgress();
  }, [saveProgress]);

  useEffect(() => {
    if (chapter) {
      const savedProgress = getSavedProgress(chapter.ranobe.id) ?? 0;
      if (savedProgress) {
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          document.body.scrollHeight - window.innerHeight,
        );
        const scrollY = (savedProgress / 100) * maxScroll;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }
    }
  }, [chapter]);

  useScrollParagraph({ currentProgress, chapter });

  const formattedDate = useMemo(() => formatDate(chapter?.updatedAt || ''), [chapter?.updatedAt]);

  const breadcrumbs = useMemo(
    (): BreadcrumbItem[] => [
      {
        label: 'RanobeRead',
        to: '/',
        icon: <HomeIcon />,
      },
      {
        label: chapter?.ranobe.nameFirst ?? '',
        to: `/ranobe/${chapter?.ranobe.id}`,
        icon: <MenuBookIcon />,
      },
      {
        label: chapter?.chapterName ?? '',
      },
    ],
    [chapter],
  );

  if (isLoading || !chapter) {
    return (
      <Box className={classes.mainContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const chapterSwitch = (
    <PageSwitcher
      isLast={chapter.isLast}
      currentPage={chapter.chapterNumber}
      baseUrl={`/chapters/${chapter.ranobe.id}`}
    />
  );

  return (
    <Box className={classes.mainContainer}>
      <Breadcrumbs items={breadcrumbs} />
      <Divider orientation="horizontal" />
      {chapterSwitch}
      <Divider orientation="horizontal" />
      <Typography variant="h4" className={classes.chapterTitle}>
        {chapter.chapterName}
      </Typography>
      <Box
        className={classes.chapterText}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chapter.chapterText) }}
      />
      <Divider orientation="horizontal" />
      {chapterSwitch}
      <Divider orientation="horizontal" />
      <Typography variant="subtitle1" color="textSecondary" className={classes.updatedAt}>
        Последнее обновление: {formattedDate}
      </Typography>
      <Divider orientation="horizontal" />
      <Comments />
    </Box>
  );
};

export default ChapterPage;
