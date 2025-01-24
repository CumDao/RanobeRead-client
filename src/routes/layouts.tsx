import { Outlet } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import Header from '../components/Header';
import MobileBottomNavigation from '../components/BottomNavigation';

export const AuthLayout = () => (
  <>
    <Snowfall style={{ zIndex: 1200 }} color="#964b00" />
    <Outlet />
  </>
);

export const MainLayout = () => (
  <>
    <Snowfall style={{ zIndex: 1200 }} color="#964b00" />
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
