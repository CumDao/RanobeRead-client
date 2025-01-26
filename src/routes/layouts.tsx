import { Outlet } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import Header from '../components/Header';
import MobileBottomNavigation from '../components/BottomNavigation';
import classes from './layouts.module.css';

export const AuthLayout = () => (
  <>
    <div className={classes.snowfall}>
      <Snowfall color="#964b00" />
    </div>
    <Outlet />
  </>
);

export const MainLayout = () => (
  <>
    <div className={classes.snowfall}>
      <Snowfall color="#964b00" />
    </div>
    <Header />
    <Outlet />
    <MobileBottomNavigation />
  </>
);

export const ReadLayout = () => (
  <>
    <Outlet />
  </>
);
