import config from 'config';
import logger from 'redux-logger';
import session from './reducers/reducer.session';
import device from './reducers/reducer.device';
import data from './reducers/reducer.data';
import modals from './reducers/reducer.modals';
import pane from './reducers/reducer.pane';
import notifications from './reducers/reducer.notifications';
import comments from './reducers/reducer.comments';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, DeepPartial } from 'redux';

const reducer = combineReducers({
  session,
  device,
  data,
  modals,
  pane,
  notifications,
  comments,
});

export type TStoreState = ReturnType<typeof reducer>;

export const createStore = (initialState?: DeepPartial<typeof reducer>) =>
  configureStore({
    reducer,
    devTools: config.isDevelopment,
    preloadedState: initialState,
    middleware: config.isDevelopment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger as any)
      : undefined,
  });

export type TRootState = ReturnType<typeof reducer>;

export type TAppDispatch = ReturnType<typeof createStore>['dispatch'];
