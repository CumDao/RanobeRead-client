import { useAppSelector } from '../../hooks/redux';
import { selectTopRanobesData, selectTopRanobesLoading } from '../../redux/selectors/getTopRanobes';
import RanobeTopCard from '../RanobeTopCard';
import classes from './RanobeTopList.module.css';
import Skeletons from '../Skeletons';
import { top } from '../../constants/titles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CardLink from '../CardLink';

const LeftArrow = () => {
  const theme = useTheme();

  return (
    <IconButton
      className={`${classes.arrow} ${classes.leftArrow}`}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={() => {
        console.log('ergerg');
      }}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );
};

const RightArrow = () => {
  const theme = useTheme();

  return (
    <IconButton
      className={`${classes.arrow} ${classes.rightArrow}`}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={() => {
        console.log('ergerg');
      }}
    >
      <NavigateNextIcon />
    </IconButton>
  );
};

const RanobeTopList = () => {
  const topRanobesData = useAppSelector(selectTopRanobesData);
  const isLoading = useAppSelector(selectTopRanobesLoading);

  const isListReady = !isLoading && topRanobesData.length;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const items = isListReady
    ? topRanobesData.map((ranobe) => (
        <CardLink key={ranobe.id} id={ranobe.id}>
          <RanobeTopCard {...ranobe} />
        </CardLink>
      ))
    : [];

  return (
    <>
      <div className={classes.title}>{top}</div>
      {isLoading ? (
        <div className={classes.skeletonsList}>
          <div className={classes.skeletonsWrapper}>
            <Skeletons />
          </div>
        </div>
      ) : isMobile ? (
        <div className={classes.listContainer}>
          <div className={classes.cardWrapper}>
            {isListReady &&
              topRanobesData.map((ranobe) => <RanobeTopCard key={ranobe.id} {...ranobe} />)}
          </div>
        </div>
      ) : (
        <div className={classes.carouselWrapper}>
          <AliceCarousel
            items={items}
            autoPlay={false}
            disableDotsControls
            mouseTracking
            keyboardNavigation
            renderPrevButton={() => <LeftArrow />}
            renderNextButton={() => <RightArrow />}
            responsive={{
              0: { items: 2 }, // 1 элемент на маленьких экранах
              600: { items: 3 }, // 2 элемента на средних экранах
              1024: { items: 4, itemsFit: 'contain' }, // 3 элемента на больших экранах
              1440: { items: 5, itemsFit: 'contain' }, // 4 элемента на очень больших экранах
            }}
          />
        </div>
      )}
    </>
  );
};

export default RanobeTopList;
