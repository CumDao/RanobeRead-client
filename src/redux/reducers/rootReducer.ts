import { combineReducers } from 'redux';
import { store } from '../store';
import topRanobes from './TopRanobesSlice';
import listRanobes from './ListRanobesSlice';
import getChapter from './ChapterSlice';

export const rootReducer = combineReducers({
  topRanobes,
  listRanobes,
  getChapter,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
