import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { store } from '../redux/store';
import NotFound from '../pages/NotFoundPage';
import { fetchTopRanobes } from '../redux/middleware/TopRanobesThunk';
import { fetchRanobes } from '../redux/middleware/ListRanobesThunk';
import RanobeDetailPage from '../pages/RanobeDetailPage';
import { MainLayout } from './layouts';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        loader: async () => {
          store.dispatch(fetchTopRanobes());
          store.dispatch(fetchRanobes());
        },
      },
      {
        path: '/ranobe/:id',
        element: <RanobeDetailPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default routes;
