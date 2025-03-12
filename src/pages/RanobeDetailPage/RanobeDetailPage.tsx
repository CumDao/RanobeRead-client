import { useParams } from 'react-router-dom';
import classes from './RanobeDetailPage.module.css';
import RanobeDetails from '../../components/RanobeDetails';
import CommentsList from '../../components/CommentsList';

const RanobeDetailPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Ranobe ID is required');
  }

  return (
    <div className={classes.mainContainer}>
      <RanobeDetails id={id} />
      <CommentsList urlParams={{ commentType: 'ranobes', id }} />
    </div>
  );
};

export default RanobeDetailPage;
