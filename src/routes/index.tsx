import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';
import RanobeDetailPage from '../pages/RanobeDetailPage';
import { MainLayout, ReadLayout } from './layouts';
import ChapterPage from '../pages/ChapterPage';
import { useChapter } from '../store/chapter';
import { useLastRanobes } from '../store/lastRanobes';
import { useTopRanobes } from '../store/topRanobes';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        loader: async () => {
          useLastRanobes.getState().fetchLastRanobes();
          useTopRanobes.getState().fetchTopRanobes();
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
        loader: async ({ params }) => {
          const { id, chapterNumber } = params;
          if (id && (chapterNumber || chapterNumber === '0')) {
            useChapter.getState().fetchChapter({
              ranobeId: id,
              chapterNumber: chapterNumber,
            });
          }
        },
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default routes;
