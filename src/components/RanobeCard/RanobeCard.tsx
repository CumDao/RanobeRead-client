import { Card, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Ranobe } from '../../types/ranobe';
import classes from './RanobeCard.module.css';
import StarIcon from '@mui/icons-material/Star';
import TagList from '../RanobeCardTags/RanobeCardTags';

const RanobeCard = ({ id, name, rating, image, description, status, tags }: Ranobe) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Card className={classes.card} key={id}>
        <div className={classes.imageContainer}>
          <CardMedia
            className={classes.image}
            component="img"
            image={`${import.meta.env.VITE_API_URL}${image}`}
            alt={name}
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

        <CardContent className={classes.contentRight}>
          <div>
            <Typography className={classes.name} variant="subtitle2">
              {name}
            </Typography>
            <Typography className={classes.description}>{description}</Typography>
            <div className={classes.tags}>
              <TagList tags={tags} />
            </div>
          </div>
          <div className={classes.statusBox}>
            <Typography className={classes.status}>{status}</Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RanobeCard;
