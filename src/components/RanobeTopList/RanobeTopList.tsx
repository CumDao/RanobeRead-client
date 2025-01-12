import { useAppSelector } from '../../hooks/redux';
import { selectTopRanobesData, selectTopRanobesLoading } from '../../redux/selectors/getTopRanobes';
import RanobeTopCard from '../RanobeTopCard';
import classes from './RanobeTopList.module.css';
import Skeletons from '../Skeletons';
import { top } from '../../constants/titles';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CardLink from '../CardLink';
import { RefObject, useRef } from 'react';
import clsx from 'clsx';

interface ArrowProps {
  scrollContainer: RefObject<HTMLDivElement | null>;
}

const LeftArrow = ({ scrollContainer }: ArrowProps) => {
  const theme = useTheme();

  const handleScrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  return (
    <IconButton
      className={clsx(classes.arrow, classes.leftArrow)}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={handleScrollLeft}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );
};

const RightArrow = ({ scrollContainer }: ArrowProps) => {
  const theme = useTheme();

  const handleScrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  return (
    <IconButton
      className={clsx(classes.arrow, classes.rightArrow)}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={handleScrollRight}
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

  const listContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={classes.title}>{top}</div>
      {isLoading ? (
        <div className={classes.skeletonsList}>
          <div className={classes.skeletonsWrapper}>
            <Skeletons />
          </div>
        </div>
      ) : (
        <div className={classes.listWrapper}>
          {!isMobile && <LeftArrow scrollContainer={listContainerRef} />}
          <div className={classes.listContainer} ref={listContainerRef}>
            <div className={classes.cardWrapper}>{isListReady && items}</div>
          </div>
          {!isMobile && <RightArrow scrollContainer={listContainerRef} />}
        </div>
      )}
    </>
  );
};

export default RanobeTopList;
