import { AppBar, Toolbar, Typography } from '@mui/material';
import classes from './Header.module.css';
import ThemeChanger from '../ThemeChanger';
import Logo from '../../components-ui/Logo';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import AuthButton from '../../components-ui/AuthButton';
import { PROJECT_NAME } from '../../constants/titles';
import { useAuth } from '../../store/auth';
import Avatar from '../../components-ui/Avatar';

const Header = () => {
  const user = useAuth.use.userData();
  return (
    <>
      <AppBar position="fixed" className={clsx(classes.header, classes.hideOnMobile)}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={clsx(classes.container, classes.title)}>
            <Logo fontSize="medium" />
            <Typography variant="h6">{PROJECT_NAME}</Typography>
          </Link>
          {/* TODO: вернуть когда будет готово */}
          <div className={classes.searchBox}>{/* <Search /> */}</div>
          <div className={classes.container}>
            {user ? (
              <div className={classes.avatarContainer}>
                <Avatar login={user.login} avatarUrl={user.avatarUrl} />
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
