import { Card, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { RanobeTop } from '../../types/ranobe';
import classes from './RanobeTopCard.module.css';
import { DragEvent } from 'react';

interface RanobeTopCardProps extends RanobeTop {}

const RanobeTopCard = ({ name, rating, image }: RanobeTopCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <Card className={classes.card}>
      <div className={classes.imageContainer}>
        <CardMedia
          className={classes.image}
          component="img"
          image={`${import.meta.env.VITE_API_URL}${image}`}
          alt={name}
          draggable={false}
          onDrag={handleDragStart}
        />
        {!isMobile && (
          <div
            className={classes.ratingBox}
            style={{ backgroundColor: theme.palette.background.paper }}
          >
            <StarIcon className={classes.starIcon} fontSize="small" />
            <Typography className={classes.rating} variant="body2" fontWeight="bold">
              {rating}
            </Typography>
          </div>
        )}
      </div>
      <CardContent className={classes.bottom}>
        <Typography className={classes.name} variant="subtitle2">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RanobeTopCard;
