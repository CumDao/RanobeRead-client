import { Box, Divider, Typography } from '@mui/material';
import classes from './ChapterPage.module.css';
import { formatDate } from '../../helpers/dateUtils';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import Breadcrumbs, { BreadcrumbItem } from '../../components-ui/Breadcrumbs/Breadcrumbs';
import PageSwitcher from '../../components/PageSwitcher';
import Comments from '../../components/Comments';
import { useChapter } from '../../store/chapter';
import { useChapterHistory } from '../../store/chaptersHistory';

const ChapterPage = () => {
  const [currentParagraph, setCurrentParagraph] = useState<string | null>(null);
  const chapter = useChapter.use.chapter();
  const isLoading = useChapter.use.isLoading();
  const chapterHistorySave = useChapterHistory.use.saveNewChapter();

  useEffect(() => {
    const paragraphs = document.querySelectorAll('p[data-paragraph-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleParagraph = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleParagraph = entry.target.getAttribute('data-paragraph-id');
          }
        });
        if (visibleParagraph) {
          setCurrentParagraph(visibleParagraph);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.5 },
    );

    paragraphs.forEach((p) => observer.observe(p));

    return () => {
      paragraphs.forEach((p) => observer.unobserve(p));
    };
  }, []);

  // Логируем текущий параграф при закрытии страницы или смене роута
  useEffect(() => {
    const logParagraph = () => {
      // if (currentParagraph) {
      //   console.log('User left on paragraph:', currentParagraph);
      // }
      console.log(currentParagraph);
    };

    window.addEventListener('beforeunload', logParagraph);
    return () => {
      logParagraph(); // Вызовем при размонтировании компонента
      window.removeEventListener('beforeunload', logParagraph);
    };
  }, [currentParagraph]);

  if (isLoading || !chapter) {
    return <Box className={classes.mainContainer}>{}</Box>;
  }

  chapterHistorySave({
    ranobeName: chapter.ranobe.nameFirst,
    chapterNumber: chapter.chapterNumber,
    ranobeId: chapter.ranobe.id,
    image: chapter.ranobe.image,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'RanobeRead',
      to: '/',
      icon: <HomeIcon />,
    },
    {
      label: chapter.ranobe.nameFirst,
      to: `/ranobe/${chapter.ranobe.id}`,
      icon: <MenuBookIcon />,
    },
    {
      label: chapter.chapterName,
    },
  ];

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
        {`${chapter.chapterName}`}
      </Typography>
      <Box
        className={classes.chapterText}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chapter.chapterText) }}
      />
      <Divider orientation="horizontal" />
      {chapterSwitch}
      <Divider orientation="horizontal" />
      <Typography variant="subtitle1" color="textSecondary" className={classes.updatedAt}>
        Последнее обновление: {formatDate(chapter.updatedAt)}
      </Typography>
      <Divider orientation="horizontal" />
      <Comments />
    </Box>
  );
};

export default ChapterPage;
