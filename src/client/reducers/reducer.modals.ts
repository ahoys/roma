import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IModal {
  id: string;
  title: string;
  created: number;
}

export interface IRemoveModal extends IModal {
  type: 'remove';
  endpoint: string;
  resource: string;
  navigateTo: string;
}

export interface ICreateNewModal extends IModal {
  type: 'create-new';
  endpoint: string;
}

export interface ICreateNewVersion extends IModal {
  type: 'create-new-version';
  endpoint: string;
}

export interface ICreateNewFeature extends IModal {
  type: 'create-new-feature';
  endpoint: string;
  resource: string;
  versionId?: number;
}

type TSupportedModal =
  | IRemoveModal
  | ICreateNewModal
  | ICreateNewVersion
  | ICreateNewFeature;

export interface IModalsState {
  active: TSupportedModal[];
}

export const initialState: IModalsState = {
  active: [],
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    /**
     * Sets a new modal, if unique.
     */
    setModal: (state, action: PayloadAction<TSupportedModal>) => {
      if (!state.active.find((m) => m.id === action.payload.id)) {
        state.active.push(action.payload);
      }
    },
    /**
     * Removes an existing modal if found.
     */
    removeModal: (state, action: PayloadAction<IModal['id']>) => {
      const modalIndex = state.active.findIndex((m) => m.id === action.payload);
      if (modalIndex !== -1) {
        state.active.splice(modalIndex, 1);
      }
    },
  },
});

export const { setModal, removeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
