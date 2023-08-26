import config from 'config';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TThemes } from '../theme';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IDeviceState {
  screenFormat: 'mobile' | 'compact' | 'wide';
  theme: keyof TThemes;
}

export const initialState: IDeviceState = {
  screenFormat: 'wide',
  theme: 'dark',
};

/**
 * Sets screenFormat.
 */
export const setScreenFormat = createAsyncThunk(
  'device/setScreenFormat',
  async (screenFormat: IDeviceState['screenFormat']) =>
    axios.put<{ screenFormat: IDeviceState['screenFormat'] }>(
      config.api + 'cookies',
      {
        screenFormat,
      }
    )
);

/**
 * Sets theme.
 */
export const setTheme = createAsyncThunk(
  'device/setTheme',
  async (theme: IDeviceState['theme']) =>
    axios.put<{ theme: IDeviceState['theme'] }>(config.api + 'cookies', {
      theme,
    })
);

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    /**
     * Sets the current theme.
     */
    setTheme: (state, action: PayloadAction<IDeviceState['theme']>) => {
      state.theme = action.payload;
    },
  },
  extraReducers(builder) {
    /**
     * Succeeded to set the screenformat.
     */
    builder.addCase(setScreenFormat.fulfilled, (state, action) => {
      state.screenFormat = action.payload.data.screenFormat;
    });
    /**
     * Succeeded to set the screenformat.
     */
    builder.addCase(setTheme.fulfilled, (state, action) => {
      state.theme = action.payload.data.theme;
    });
  },
});

export default deviceSlice.reducer;
