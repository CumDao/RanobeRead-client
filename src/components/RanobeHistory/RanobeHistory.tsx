import { useMemo } from 'react';
import Carousel from '../../components-ui/Carousel';
import RanobeHistoryCard from '../../components-ui/RanobeHistoryCard';
import { TITLE_HISTORY } from '../../constants/titles';
import { useChapterHistory } from '../../store/chaptersHistory';
import classes from './RanobeHistory.module.css';

const RanobeHistory = () => {
  const history = useChapterHistory.use.chapters();
  // O(n log n)
  const sortedHistory = useMemo(() => {
    return Object.entries(history)
      .map(([ranobeId, chapter]) => ({ ranobeId, ...chapter }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [history]);

  return (
    <>
      {!!sortedHistory.length && (
        <>
          <div className={classes.title}>{TITLE_HISTORY}</div>
          <Carousel>
            {sortedHistory.map((ranobe) => (
              <RanobeHistoryCard key={ranobe.ranobeId} {...ranobe} />
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default RanobeHistory;
