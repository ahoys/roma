import config from 'config';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ISessionState {
  language: 'en' | 'fi';
  isLoggedIn: boolean;
}

export const initialState: ISessionState = {
  language: 'fi',
  isLoggedIn: config.isDevelopment && config.oauth.overrideAccess,
};

/**
 * Validate SSO-login if the client
 * claims to be logged-in.
 */
export const verify = createAsyncThunk('session/verify', async () =>
  axios.get(config.api + 'verify')
);

/**
 * Sets language.
 */
export const setLanguage = createAsyncThunk(
  'session/setLanguage',
  async (language: ISessionState['language']) =>
    axios.put<{ language: ISessionState['language'] }>(config.api + 'cookies', {
      language,
    })
);

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    removeSession: (): ISessionState => ({
      ...initialState,
    }),
  },
  extraReducers(builder) {
    /**
     * Failed to verify the session. Reset the session.
     */
    builder.addCase(verify.rejected, () => {
      localStorage.setItem('pathname', window.location.pathname);
      return {
        ...initialState,
      };
    });
    /**
     * Succeeded to set the language.
     */
    builder.addCase(setLanguage.fulfilled, (state, action) => {
      state.language = action.payload.data.language;
    });
  },
});

export default slice.reducer;
