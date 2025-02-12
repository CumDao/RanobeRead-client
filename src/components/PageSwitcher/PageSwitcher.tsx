import { Button } from '@mui/material';
import classes from './PageSwitcher.module.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface PageSwitcherProps {
  isLast: boolean;
  currentPage: number;
  baseUrl: string;
}

const PageSwitcher = ({ isLast, currentPage, baseUrl }: PageSwitcherProps) => {
  const navigate = useNavigate();
  const handleSwitchPage = (page: number) => {
    navigate(`${baseUrl}/${page}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && currentPage > 0) {
        handleSwitchPage(currentPage - 1);
      } else if (event.key === 'ArrowRight' && !isLast) {
        handleSwitchPage(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={classes.switchContainer}>
      {currentPage !== 1 && (
        <Button
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => handleSwitchPage(currentPage - 1)}
          className={classes.prevButton}
        >
          Назад
        </Button>
      )}
      {!isLast && (
        <Button
          variant="contained"
          endIcon={<NavigateNextIcon />}
          onClick={() => handleSwitchPage(currentPage + 1)}
          className={classes.nextButton}
        >
          Вперед
        </Button>
      )}
    </div>
  );
};

export default PageSwitcher;
