import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Ranobe } from '../../types/ranobe';
import StarIcon from '@mui/icons-material/Star';
import TagList from '../RanobeCardTags/RanobeCardTags';
import classes from './RanobeCard.module.css';
import NavigateLink from '../NavigateLink';
import { getFullUrl } from '../../helpers/getFullUrl';

const animation = 'wave';

const RanobeCard = ({ id, nameFirst, rating, image, description, status, tags }: Ranobe) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Card className={classes.card} key={id}>
        <div className={classes.imageContainer}>
          {image ? (
            <>
              <NavigateLink to={`/ranobe/${id}`}>
                <CardMedia
                  className={classes.image}
                  component="img"
                  image={getFullUrl(image)}
                  alt={nameFirst}
                  loading="lazy"
                  draggable={false}
                />
              </NavigateLink>
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
            </>
          ) : (
            <Skeleton animation={animation} variant="rectangular" className={classes.image} />
          )}
        </div>
        <CardContent className={classes.contentRight}>
          <div>
            <Typography className={classes.name} variant="subtitle2">
              {nameFirst ? (
                <NavigateLink to={`/ranobe/${id}`}>{nameFirst}</NavigateLink>
              ) : (
                <Skeleton animation={animation} />
              )}
            </Typography>
            <Typography className={classes.description}>
              {description ?? <Skeleton animation={animation} />}
            </Typography>
            {!!tags && (
              <div className={classes.tags}>
                <TagList tags={tags} />
              </div>
            )}
          </div>
          <div className={classes.statusBox}>
            <Typography className={classes.status}>
              {status ?? <Skeleton animation={animation} />}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RanobeCard;
