import { Box, Typography } from '@mui/material';
import styles from './NotFoundPage.module.css';
import { NavLink } from 'react-router-dom';
import NotFoundGif from '../../assets/error.webp';
import Header from '../../components/Header';

const NotFound = () => {
  return (
    <>
      <div className={styles.errorPage}>
        <Header />
        <Typography variant="h4" color="error" className={styles.errorHeading}>
          Cтраница не найдена
        </Typography>
        <Typography color="error" variant="body1" className={styles.errorText}>
          Возможно, вы ошиблись в URL или страница была перемещена. Попробуйте перейти на{' '}
          <NavLink to="/">главную страницу</NavLink> сайта.
        </Typography>
        <Box component="img" src={NotFoundGif} alt="404 Animation" />
      </div>
    </>
  );
};
export default NotFound;
