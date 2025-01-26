import Grid2 from '@mui/material/Grid2';
import Skeletons from '../Skeletons';
import classes from './RanobeList.module.css';
import { list } from '../../constants/titles';
import RanobeCard from '../RanobeCard/RanobeCard';
import { useLastRanobes } from '../../store/lastRanobes';

const RanobeList = () => {
  const lastRanobesData = useLastRanobes.use.ranobes();
  const isLoading = useLastRanobes.use.isLoading();

  const isListReady = !isLoading && lastRanobesData.length;

  return (
    <>
      <div className={classes.title}>{list}</div>
      <div className={classes.listContainer}>
        {isListReady &&
          lastRanobesData.map((ranobe) => (
            <Grid2 size={3} key={ranobe.id}>
              <RanobeCard {...ranobe} />
            </Grid2>
          ))}
        {isLoading && <Skeletons isGrid />}
      </div>
    </>
  );
};

export default RanobeList;
