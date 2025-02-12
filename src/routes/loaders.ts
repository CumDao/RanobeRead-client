import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { getToken } from '../helpers/storageToken';
import { useAuth } from '../store/auth';
import { useChapter } from '../store/chapter';
import { useLastRanobes } from '../store/lastRanobes';
import { useTopRanobes } from '../store/topRanobes';

export const rootLoader = async () => {
  const token = getToken();
  if (token) {
    useAuth.getState().getProfile();
  }
};

export const chapterLoader: LoaderFunction = async (params: LoaderFunctionArgs) => {
  const { id, chapterNumber } = params.params;
  if (id && (chapterNumber || chapterNumber === '0')) {
    useChapter.getState().fetchChapter({
      ranobeId: id,
      chapterNumber: chapterNumber,
    });
  }
};

export const mainLoader = async () => {
  useLastRanobes.getState().fetchLastRanobes();
  useTopRanobes.getState().fetchTopRanobes();
};
