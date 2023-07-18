import logger from 'redux-logger';
import session from './reducers/reducer.session';
import device from './reducers/reducer.device';
import data from './reducers/reducer.data';
import modals from './reducers/reducer.modals';
import pane from './reducers/reducer.pane';
import notifications from './reducers/reducer.notifications';
import config from 'config';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, DeepPartial } from 'redux';

const reducer = combineReducers({
  session,
  device,
  data,
  modals,
  pane,
  notifications,
});

export type TStoreState = ReturnType<typeof reducer>;

export const createStore = (initialState?: DeepPartial<typeof reducer>) =>
  configureStore({
    reducer,
    devTools: config.isDevelopment,
    preloadedState: initialState,
    middleware: config.isDevelopment
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : undefined,
  });

export type TRootState = ReturnType<typeof reducer>;

export type TAppDispatch = ReturnType<typeof createStore>['dispatch'];
