import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IPane {
  type: string;
}

export interface IDevPane extends IPane {
  type: 'dev-pane';
  value: string;
}

export interface INewAssignmentPane extends IPane {
  type: 'new-assignment-pane';
  feature: number;
}

export interface IEditAssignmentPane extends IPane {
  type: 'edit-assignment-pane';
  id: number;
}

export interface INewRequirementPane extends IPane {
  type: 'new-requirement-pane';
  feature: number;
}

export interface IEditRequirementPane extends IPane {
  type: 'edit-requirement-pane';
  id: number;
}

export interface IPaneState {
  title: string;
  forced: boolean;
  data:
    | IDevPane
    | INewAssignmentPane
    | IEditAssignmentPane
    | INewRequirementPane
    | IEditRequirementPane
    | undefined;
}

export const initialState: IPaneState = {
  title: '',
  forced: false, // If forced, automated closing functionality is removed.
  data: undefined,
};

export const paneSlice = createSlice({
  name: 'pane',
  initialState,
  reducers: {
    /**
     * Sets a new pane, if unique.
     */
    setPane: (state, action: PayloadAction<IPaneState>) => ({
      ...state,
      ...action.payload,
    }),
    /**
     * Removes an existing pane if found.
     */
    removePane: () => ({
      ...initialState,
    }),
  },
});

export const { setPane, removePane } = paneSlice.actions;

export default paneSlice.reducer;
