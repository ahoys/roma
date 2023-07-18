import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TThemes } from '../theme';

export interface IDeviceState {
  screenFormat: 'mobile' | 'compact' | 'wide';
  theme: keyof TThemes;
}

export const initialState: IDeviceState = {
  screenFormat: 'wide',
  theme: 'dark',
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    /**
     * Sets the current screenformat.
     */
    setScreenFormat: (
      state,
      action: PayloadAction<IDeviceState['screenFormat']>
    ) => {
      state.screenFormat = action.payload;
    },
    /**
     * Sets the current theme.
     */
    setTheme: (state, action: PayloadAction<IDeviceState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const { setScreenFormat, setTheme } = deviceSlice.actions;

export default deviceSlice.reducer;
