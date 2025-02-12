import {
  BottomNavigation,
  BottomNavigationAction,
  ButtonGroup,
  IconButton,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import classes from './MobileBottomNavigation.module.css';
import { useState } from 'react';
import Logo from '../../components-ui/Logo';
import ThemeChanger from '../ThemeChanger';
import Drawer from '../../components-ui/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthButton from '../../components-ui/AuthButton';
import { useAuth } from '../../store/auth';
import UserCard from '../../components-ui/UserCard';
import LogOutButton from '../../components-ui/LogOutButton';

const MobileBottomNavigation = () => {
  const user = useAuth.use.userData();
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
      <Drawer
        isDrawerOpen={isDrawerOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        footer={<div className={classes.footer}>v0.0.4</div>}
        header={
          <div className={classes.headerContainer}>
            <ButtonGroup className={classes.headerGroup}>
              <ThemeChanger />
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </ButtonGroup>
            {user ? (
              <div>
                <UserCard login={user.login} avatarUrl={user.avatarUrl} />
              </div>
            ) : (
              <AuthButton className={classes.authButton} />
            )}
          </div>
        }
      >
        <div>
          <p>ergwg</p>
          {user && <LogOutButton className={classes.authButton} />}
        </div>
      </Drawer>
    </>
  );
};

export default MobileBottomNavigation;
