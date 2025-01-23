import Grid2 from '@mui/material/Grid2';
import { useAppSelector } from '../../hooks/redux';
import { selectRanobesData, selectRanobesLoading } from '../../redux/selectors/getRanobes';
import Skeletons from '../Skeletons';
import classes from './RanobeList.module.css';
import { list } from '../../constants/titles';
import RanobeCard from '../RanobeCard/RanobeCard';

const RanobeList = () => {
  const topRanobesData = useAppSelector(selectRanobesData);
  const isLoading = useAppSelector(selectRanobesLoading);

  const isListReady = !isLoading && topRanobesData.length;

  return (
    <>
      <div className={classes.title}>{list}</div>
      <div className={classes.listContainer}>
        {isListReady &&
          topRanobesData.map((ranobe) => (
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
