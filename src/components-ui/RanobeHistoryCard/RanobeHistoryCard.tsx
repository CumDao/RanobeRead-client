import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import classes from './RanobeHistoryCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useChapterHistory } from '../../store/chaptersHistory';
import NavigateLink from '../NavigateLink';
import { getFullUrl } from '../../helpers/getFullUrl';

interface RanobeHistoryCardProps {
  ranobeId: string;
  chapterNumber: number;
  ranobeName: string;
  image: string;
  progress: number;
}

const RanobeHistoryCard = ({
  ranobeId,
  ranobeName,
  chapterNumber,
  image,
  progress,
}: RanobeHistoryCardProps) => {
  const removeHistoryItem = useChapterHistory.use.removeChapterById();
  const handleRemove = () => {
    removeHistoryItem(ranobeId);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.imageContainer}>
        <NavigateLink to={`/ranobe/${ranobeId}`}>
          <CardMedia
            component="img"
            alt={ranobeName}
            image={getFullUrl(image)}
            className={classes.image}
            loading="lazy"
          />
        </NavigateLink>
      </div>
      <CardContent className={classes.textContainer}>
        <Typography variant="h6" className={classes.title}>
          <NavigateLink to={`/ranobe/${ranobeId}`}>{ranobeName}</NavigateLink>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <NavigateLink to={`/chapters/${ranobeId}/${chapterNumber}`}>
            Глава: {chapterNumber} - {progress > 100 ? 100 : progress}%
          </NavigateLink>
        </Typography>
        <progress className={classes.progress} max={100} value={progress} />
        <IconButton onClick={handleRemove} className={classes.deleteButton}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RanobeHistoryCard;
