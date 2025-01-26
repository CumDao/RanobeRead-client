import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { store } from '../redux/store';
import NotFound from '../pages/NotFoundPage';
import { fetchTopRanobes } from '../redux/middleware/TopRanobesThunk';
import { fetchRanobes } from '../redux/middleware/ListRanobesThunk';
import RanobeDetailPage from '../pages/RanobeDetailPage';
import { MainLayout, ReadLayout } from './layouts';
import ChapterPage from '../pages/ChapterPage';

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
        loader: async () => {},
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/chapters',
    element: <ReadLayout />,
    children: [
      {
        path: ':id/:chapterNumber',
        element: <ChapterPage />,
      },
    ],
  },
]);

export default routes;
