import { BottomNavigation, BottomNavigationAction, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import classes from './MobileBottomNavigation.module.css';
import { useState } from 'react';
import Logo from '../../components-ui/Logo';
import ThemeChanger from '../ThemeChanger';
import Drawer from '../../components-ui/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileBottomNavigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = () => setIsDrawerOpen(true);
  const handleClose = () => setIsDrawerOpen(false);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <BottomNavigation
        showLabels
        className={classes.bottomNav}
        sx={{
          backgroundColor: theme.palette.primary.main,
          '& .MuiBottomNavigationAction-root': {
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.primary.dark,
            },
          },
        }}
      >
        <BottomNavigationAction label="Тема" icon={<ThemeChanger isRenderAsIcon />} />
        <BottomNavigationAction
          label=""
          onClick={handleLogoClick}
          icon={<Logo fontSize="large" />}
        />
        <BottomNavigationAction label="Меню" icon={<MenuIcon />} onClick={handleOpen} />
      </BottomNavigation>
      <Drawer isDrawerOpen={isDrawerOpen} handleOpen={handleOpen} handleClose={handleClose}>
        <div>
          <p>ergwg</p>
        </div>
      </Drawer>
    </>
  );
};

export default MobileBottomNavigation;
