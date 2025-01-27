import { Box, Divider, Skeleton, Typography, Breadcrumbs as BreadcrumbsMUI } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { selectChapterData, selectChapterLoading } from '../../redux/selectors/getChapter';
import classes from './ChapterPage.module.css';
import { formatDate } from '../../utils/dateUtils';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Breadcrumbs, { BreadcrumbItem } from '../../components/Breadcrumbs/Breadcrumbs';
import clsx from 'clsx';
import PageSwitcher from '../../components/PageSwitcher';
import Comments from '../../components/Comments';

const animation = 'wave';
const skeletons = Array.from({ length: 20 }, (_, i) => <Skeleton key={i} animation={animation} />);

const ChapterPage = () => {
  const chapter = useAppSelector(selectChapterData);
  const isLoading = useAppSelector(selectChapterLoading);

  if (isLoading || !chapter) {
    return (
      <Box className={classes.mainContainer}>
        <BreadcrumbsMUI separator="»">
          <div className={classes.breadcrumbLoad}>
            <HomeIcon />
            <Skeleton animation={animation} width={96} />
          </div>
          <div className={classes.breadcrumbLoad}>
            <MenuBookIcon />
            <Skeleton animation={animation} width={40} />
          </div>
          <div className={classes.breadcrumbLoad}>
            <Skeleton animation={animation} width={97} />
          </div>
        </BreadcrumbsMUI>
        <Divider orientation="horizontal" />
        <Typography variant="h4" className={classes.chapterTitle}>
          <Skeleton width="20%" animation={animation} />
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={clsx(classes.updatedAt, classes.loadBase)}
        >
          Последнее обновление: <Skeleton width="10%" animation={animation} />
        </Typography>
        <Typography variant="body1" className={classes.chapterText}>
          {skeletons.map((skeleton) => skeleton)}
        </Typography>
      </Box>
    );
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
