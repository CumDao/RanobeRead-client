import { Box, Button, Typography } from '@mui/material';
import styles from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';
import LoadErrorGif from '../../assets/load_error.webp';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(0);
  };

  return (
    <>
      <div className={styles.errorPage}>
        <Typography variant="h6" color="error">
          Упс! Что-то пошло не так
        </Typography>
        <Typography color="error" variant="body1" className={styles.errorText}>
          Произошла ошибка. Попробуйте перезагрузить страницу
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRetry}
          className={styles.retryButton}
        >
          Перезагрузить страницу
        </Button>
        <Box component="img" src={LoadErrorGif} alt="404 Animation" />
      </div>
    </>
  );
};
export default ErrorPage;
