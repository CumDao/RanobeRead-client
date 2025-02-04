import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import classes from './RanobeHistoryCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useChapterHistory } from '../../store/chaptersHistory';
import NavigateLink from '../NavigateLink';

interface RanobeHistoryCardProps {
  ranobeId: string;
  chapterNumber: number;
  ranobeName: string;
  image: string;
}

const RanobeHistoryCard = ({
  ranobeId,
  ranobeName,
  chapterNumber,
  image,
}: RanobeHistoryCardProps) => {
  const removeHistoryItem = useChapterHistory.use.removeChapterById();
  const handleRemove = () => {
    removeHistoryItem(ranobeId);
  };

  return (
    <Card className={classes.card}>
      <NavigateLink to={`/ranobe/${ranobeId}`} className={classes.imageContainer}>
        <CardMedia
          component="img"
          alt={ranobeName}
          image={`${import.meta.env.VITE_API_URL}${image}`}
          className={classes.image}
          loading="lazy"
        />
      </NavigateLink>
      <CardContent className={classes.textContainer}>
        <Typography variant="h6" className={classes.title}>
          <NavigateLink to={`/ranobe/${ranobeId}`}>{ranobeName}</NavigateLink>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <NavigateLink to={`/chapters/${ranobeId}/${chapterNumber}`}>
            Глава: {chapterNumber}
          </NavigateLink>
        </Typography>
        <IconButton onClick={handleRemove} className={classes.deleteButton}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RanobeHistoryCard;
