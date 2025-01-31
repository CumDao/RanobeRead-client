import { AppBar, Toolbar, Typography } from '@mui/material';
import classes from './Header.module.css';
import Search from '../Search';
import ThemeChanger from '../ThemeChanger';
import Logo from '../../components-ui/Logo';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <AppBar position="fixed" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <NavLink to="/" className={clsx(classes.hideOnMobile, classes.title)}>
            <Logo fontSize="medium" />
            <Typography variant="h6">RanobeRead</Typography>
          </NavLink>
          <div className={classes.searchBox}>
            <Search />
            <div className={classes.hideOnMobile}>
              <ThemeChanger />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
