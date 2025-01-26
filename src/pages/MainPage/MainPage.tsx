import RanobeList from '../../components/RanobeList';
import RanobeTopList from '../../components/RanobeTopList';
import { useLastRanobes } from '../../store/lastRanobes';
import { useTopRanobes } from '../../store/topRanobes';
import ErrorPage from '../ErrorPage';
import classes from './MainPage.module.css';

const MainPage = () => {
  const errorLast = useLastRanobes.use.error();
  const errorTop = useTopRanobes.use.error();
  const error = errorTop || errorLast;

  if (error) return <ErrorPage />;

  return (
    <div className={classes.mainContainer}>
      <RanobeTopList />
      <RanobeList />
    </div>
  );
};

export default MainPage;
