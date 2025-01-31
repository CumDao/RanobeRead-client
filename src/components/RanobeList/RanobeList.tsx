import Grid2 from '@mui/material/Grid2';
import classes from './RanobeList.module.css';
import { TITLE_LAST } from '../../constants/titles';
import RanobeCard from '../../components-ui/RanobeCard/RanobeCard';
import { useLastRanobes } from '../../store/lastRanobes';

const RanobeList = () => {
  const lastRanobesData = useLastRanobes.use.ranobes();
  const isLoading = useLastRanobes.use.isLoading();

  return (
    <>
      <div className={classes.title}>{TITLE_LAST}</div>
      <div className={classes.listContainer}>
        {/* {isListReady &&
          lastRanobesData.map((ranobe) => (
            <Grid2 size={3} key={ranobe.id}>
              <RanobeCard {...ranobe} />
            </Grid2>
          ))} */}
        {(isLoading ? Array.from(new Array(20)) : lastRanobesData).map((ranobe, index) => (
          <Grid2 size={3} key={ranobe?.id ?? `skeletonLast-${index}`}>
            <RanobeCard {...ranobe} />
          </Grid2>
        ))}
      </div>
    </>
  );
};

export default RanobeList;
