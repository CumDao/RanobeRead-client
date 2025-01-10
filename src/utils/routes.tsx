import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import MobileBottomNavigation from '../components/BottomNavigation';
import { store } from '../redux/store';
import NotFound from '../pages/NotFound';
import { fetchTopRanobes } from '../redux/middleware/TopRanobesThunk';
import { fetchRanobes } from '../redux/middleware/ListRanobesThunk';

const routes = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
        <MobileBottomNavigation />
      </>
    ),
    children: [
      // {
      //   path: "/ranobe/:id",
      //   element: <RanobePage />,
      // },
      {
        path: '/',
        element: <MainPage />,
        loader: async () => {
          store.dispatch(fetchTopRanobes());
          store.dispatch(fetchRanobes());
        },
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default routes;
