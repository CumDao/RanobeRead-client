import RanobeTopCard from '../../components-ui/RanobeTopCard';
import { TITLE_TOP } from '../../constants/titles';
import { useTopRanobes } from '../../store/topRanobes';
import Carousel from '../../components-ui/Carousel';
import classes from './RanobeTopList.module.css';

const RanobeTopList = () => {
  const topRanobesData = useTopRanobes.use.ranobes();
  const isLoading = useTopRanobes.use.isLoading();

  return (
    <>
      <div className={classes.title}>{TITLE_TOP}</div>
      <Carousel>
        {(isLoading ? Array.from(new Array(15)) : topRanobesData).map((ranobe, index) => (
          <RanobeTopCard key={ranobe?.id ?? `skeletonTop-${index}`} {...ranobe} />
        ))}
      </Carousel>
    </>
  );
};

export default RanobeTopList;
