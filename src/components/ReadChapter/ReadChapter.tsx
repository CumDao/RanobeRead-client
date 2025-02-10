import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useChapter } from '../../store/chapter';
import { useChapterHistory } from '../../store/chaptersHistory';
import { useBeforeUnload } from 'react-router-dom';
import useScrollParagraph from '../../hooks/useScrollParagraph';
import { formatDate } from '../../helpers/dateUtils';
import Breadcrumbs, { BreadcrumbItem } from '../../components-ui/Breadcrumbs/Breadcrumbs';
import DOMPurify from 'dompurify';
import PageSwitcher from '../PageSwitcher';
import classes from './ReadChapter.module.css';

const ReadChapter = () => {
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
      progress: currentProgress.current ?? 0,
    });
  }, [chapter, chapterHistorySave]);
  useBeforeUnload(saveProgress);
  useEffect(() => {
    return () => {
      if (!chapter) return;
      saveProgress();
      console.log(currentProgress);
      console.log({
        ranobeName: chapter.ranobe.nameFirst,
        chapterNumber: chapter.chapterNumber,
        ranobeId: chapter.ranobe.id,
        image: chapter.ranobe.image,
        progress: currentProgress.current,
      });
    };
  }, [saveProgress]);

  useEffect(() => {
    if (chapter) {
      const savedProgress = getSavedProgress(chapter.ranobe.id, chapter.chapterNumber) ?? 0;
      if (savedProgress === 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        document.body.scrollHeight - window.innerHeight,
      );
      const scrollY = (savedProgress / 100) * maxScroll;
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
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
    <>
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
    </>
  );
};

export default ReadChapter;
