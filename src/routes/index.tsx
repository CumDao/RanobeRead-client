import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';
import RanobeDetailPage from '../pages/RanobeDetailPage';
import { MainLayout, ReadLayout, RootLayout } from './layouts';
import ChapterPage from '../pages/ChapterPage';
import AuthPage from '../pages/AuthPage';
import { chapterLoader, mainLoader, ranobeDetailsLoader, rootLoader } from './loaders';
import ErrorPage from '../pages/ErrorPage';

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <MainPage />,
            loader: mainLoader,
          },
          {
            path: '/ranobe/:id',
            element: <RanobeDetailPage />,
            loader: ranobeDetailsLoader,
          },
        ],
      },
      {
        path: '/chapters',
        element: <ReadLayout />,
        children: [
          {
            path: ':id/:chapterNumber',
            element: <ChapterPage />,
            loader: chapterLoader,
          },
        ],
        errorElement: <ErrorPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
