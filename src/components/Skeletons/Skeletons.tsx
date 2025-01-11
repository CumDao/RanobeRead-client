import { ReactNode } from 'react';
import classes from './Skeletons.module.css';
import { Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

interface SkeletonsProps {
  isGrid?: boolean;
}

const Skeletons = ({ isGrid = false }: SkeletonsProps) => {
  const skeletons: ReactNode[] = [];
  for (let index = 0; index < 15; index++) {
    if (isGrid) {
      skeletons.push(
        <Grid2 size={3} key={`base-${index}`}>
          <Skeleton variant="rounded" animation="wave" className={classes.skeleton} />
        </Grid2>,
      );
    } else {
      skeletons.push(
        <Skeleton
          key={`top-${index}`}
          variant="rounded"
          animation="wave"
          className={classes.skeleton}
        />,
      );
    }
  }
  return <>{skeletons}</>;
};

export default Skeletons;
