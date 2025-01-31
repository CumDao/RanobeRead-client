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
import { NavLink } from 'react-router-dom';
import classes from './RanobeCard.module.css';

const animation = 'wave';

const RanobeCard = ({ id, name, rating, image, description, status, tags }: Ranobe) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Card className={classes.card} key={id}>
        <div className={classes.imageContainer}>
          {image ? (
            <>
              <NavLink to={`/ranobe/${id}`}>
                <CardMedia
                  className={classes.image}
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}${image}`}
                  alt={name}
                  loading="lazy"
                  draggable={false}
                />
              </NavLink>
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
              {name ? (
                <NavLink to={`/ranobe/${id}`} className={classes.nameLink}>
                  {name}
                </NavLink>
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
