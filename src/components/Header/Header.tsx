import { AppBar, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import classes from './Header.module.css';
import ThemeChanger from '../ThemeChanger';
import Logo from '../../components-ui/Logo';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import AuthButton from '../../components-ui/AuthButton';
import { PROJECT_NAME } from '../../constants/titles';
import { useAuth } from '../../store/auth';
import Avatar from '../../components-ui/Avatar';
import { MouseEvent, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const user = useAuth.use.userData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = useAuth.use.signOut();
  const handleOut = () => {
    signOut();
  };
  return (
    <>
      <AppBar position="fixed" className={clsx(classes.header, classes.hideOnMobile)}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={clsx(classes.container, classes.title)}>
            <Logo fontSize="medium" />
            <Typography variant="h6">{PROJECT_NAME}</Typography>
          </Link>
          {/* TODO: вернуть когда будет готово */}
          {/* <div className={classes.searchBox}><Search /></div> */}
          <div className={classes.container}>
            {user ? (
              <div className={classes.avatarContainer}>
                <Avatar onClick={handleOpen} login={user.login} avatarUrl={user.avatarUrl} />
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  disableScrollLock={true}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Мой профиль
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Настройки
                  </MenuItem>
                  <MenuItem onClick={handleOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Выйти
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <AuthButton className={classes.authButton} />
            )}
            <ThemeChanger />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
