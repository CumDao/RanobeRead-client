import { Box, Divider, Typography } from '@mui/material';
import classes from './ChapterPage.module.css';
import { formatDate } from '../../helpers/dateUtils';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Breadcrumbs, { BreadcrumbItem } from '../../components-ui/Breadcrumbs/Breadcrumbs';
import PageSwitcher from '../../components/PageSwitcher';
import Comments from '../../components/Comments';
import { useChapter } from '../../store/chapter';

const ChapterPage = () => {
  const chapter = useChapter.use.chapter();
  const isLoading = useChapter.use.isLoading();

  if (isLoading || !chapter) {
    return <Box className={classes.mainContainer}>{}</Box>;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'RanobeRead',
      to: '/',
      icon: <HomeIcon />,
    },
    {
      label: chapter.ranobe.name,
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
      <Typography variant="body1" className={classes.chapterText}>
        {chapter.chapterText}
      </Typography>
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
