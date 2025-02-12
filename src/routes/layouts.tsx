import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MobileBottomNavigation from '../components/BottomNavigation';

export const AuthLayout = () => (
  <>
    <Outlet />
  </>
);

export const MainLayout = () => (
  <>
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

export const RootLayout = () => (
  <>
    <Outlet />
  </>
);
