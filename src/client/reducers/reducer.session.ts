import config from 'config';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ISessionState {
  language: 'fi' | 'en',
  isLoggedIn: boolean;
}

export const initialState: ISessionState = {
  language: 'fi',
  isLoggedIn: config.isDevelopment && config.oauth.overrideAccess,
};

/**
 * Validate SSO-login.
 */
export const verify = createAsyncThunk(
  'session/verify',
  async (payload, { dispatch }) => {
    // The user claims to be logged-in. Verify
    // with sign-in provider.
    axios.get(config.api + 'verify').catch(() => {
      // The session is outdated.
      localStorage.setItem('pathname', window.location.pathname);
      dispatch(slice.actions.removeSession());
    });
  }
);

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    removeSession: (): ISessionState => ({
      ...initialState,
    }),
  },
});

export const { setLanguage } = slice.actions;

export default slice.reducer;
