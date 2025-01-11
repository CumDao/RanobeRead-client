import { useAppSelector } from '../../hooks/redux';
import { selectTopRanobesData, selectTopRanobesLoading } from '../../redux/selectors/getTopRanobes';
import RanobeTopCard from '../RanobeTopCard';
import classes from './RanobeTopList.module.css';
import Skeletons from '../Skeletons';
import { top } from '../../constants/titles';
import Carousel from 'react-material-ui-carousel';
import groupIntoChunks from '../../helpers/groupIntoChunks';
import { useMediaQuery, useTheme } from '@mui/material';

const RanobeTopList = () => {
  const theme = useTheme();

  const topRanobesData = useAppSelector(selectTopRanobesData);
  const isLoading = useAppSelector(selectTopRanobesLoading);

  const isListReady = !isLoading && topRanobesData.length;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const chunkSize = isMobile ? 3 : 5;
  const groupedTopRanobesData = groupIntoChunks(topRanobesData, chunkSize);

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
        <Carousel
          className={classes.carousel}
          navButtonsAlwaysVisible
          swipe
          animation="slide"
          stopAutoPlayOnHover
          autoPlay
          interval={2000}
        >
          {isListReady &&
            groupedTopRanobesData.map((ranobeChunk) => (
              <div className={classes.chunk}>
                {ranobeChunk.map((ranobe) => (
                  <RanobeTopCard key={ranobe.id} {...ranobe} />
                ))}
              </div>
            ))}
        </Carousel>
      )}
    </>
  );
};

export default RanobeTopList;
