import { ReactNode, RefObject, useRef } from 'react';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import clsx from 'clsx';
import classes from './Carousel.module.css';

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

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const listContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.listWrapper}>
      {!isMobile && <LeftArrow scrollContainer={listContainerRef} />}
      <div className={classes.listContainer} ref={listContainerRef}>
        <div className={classes.cardWrapper}>{children}</div>
      </div>
      {!isMobile && <RightArrow scrollContainer={listContainerRef} />}
    </div>
  );
};

export default Carousel;
