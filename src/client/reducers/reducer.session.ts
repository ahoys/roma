import config from 'config';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ISessionState {
  isLoggedIn: boolean;
}

export const initialState: ISessionState = {
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
    removeSession: (): ISessionState => ({
      ...initialState,
    }),
  },
});

export default slice.reducer;
