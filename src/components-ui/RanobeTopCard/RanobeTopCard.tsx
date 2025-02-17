import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { RanobeTop } from '../../types/ranobe';
import { DragEvent } from 'react';
import classes from './RanobeTopCard.module.css';
import NavigateLink from '../NavigateLink';
import { getFullUrl } from '../../helpers/getFullUrl';

interface RanobeTopCardProps extends RanobeTop {}

const animation = 'wave';

const RanobeTopCard = ({ id, nameFirst, rating, image }: RanobeTopCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <Card className={classes.card}>
      {image ? (
        <NavigateLink to={`/ranobe/${id}`}>
          <div className={classes.imageContainer}>
            <CardMedia
              className={classes.image}
              component="img"
              image={getFullUrl(image)}
              alt={nameFirst}
              loading="lazy"
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
        </NavigateLink>
      ) : (
        <Skeleton animation={animation} variant="rectangular" className={classes.imageContainer} />
      )}
      <CardContent className={classes.bottom}>
        <Typography className={classes.name} variant="subtitle2">
          {nameFirst ? (
            <NavigateLink to={`/ranobe/${id}`}>{nameFirst}</NavigateLink>
          ) : (
            <Skeleton animation={animation} />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RanobeTopCard;
