import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';

interface INotification {
  id: string;
  created: number;
}

export interface ITextNotification extends INotification {
  type: 'text';
  icon: IconDefinition;
  value: string;
}

type TSupportedNotifications = ITextNotification;

export interface INotificationsState {
  all: TSupportedNotifications[];
  active: TSupportedNotifications[];
}

export const initialState: INotificationsState = {
  all: [],
  active: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    /**
     * Sets a new notification, if unique.
     */
    setNotification: (
      state,
      action: PayloadAction<TSupportedNotifications>
    ) => {
      state.all.unshift(action.payload);
      state.active.push(action.payload);
    },
    /**
     * Removes an existing notification if found.
     */
    removeNotification: (state, action: PayloadAction<INotification['id']>) => {
      const notificationIndex = state.active.findIndex(
        (n) => n.id === action.payload
      );
      if (notificationIndex !== -1) {
        state.active.splice(notificationIndex, 1);
      }
    },
    /**
     * Generates error-notifications based on the given messages.
     */
    setErrorNotifications: (state, action: PayloadAction<string[]>) => {
      if (Array.isArray(action.payload)) {
        let i = 0;
        for (const msg of action.payload) {
          if (typeof msg === 'string') {
            const textNotification: ITextNotification = {
              id: `reducer.notifications:error:${i}`,
              type: 'text',
              icon: faSkull,
              value: msg,
              created: new Date().getTime(),
            };
            i += 1;
            state.all.unshift(textNotification);
            state.active.push(textNotification);
          }
        }
      }
    },
  },
});

export const { setNotification, removeNotification, setErrorNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
