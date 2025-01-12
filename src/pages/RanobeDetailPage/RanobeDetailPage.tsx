import { useParams } from 'react-router-dom';
import classes from './RanobeDetailPage.module.css';

const RanobeDetailPage = () => {
  const { id } = useParams();

  return (
    <div className={classes.mainContainer}>
      <p>Тут страница с id: {id}</p>
    </div>
  );
};

export default RanobeDetailPage;
