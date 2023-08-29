import config from 'config';
import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequirementCommentDTO } from 'dtos/dto.RequirementCommentDTO';
import { AssignmentCommentDTO } from 'dtos/dto.AssignmentCommentDTO';

export interface ICommentsState {
  // Workspace values are values that are not yet saved to the backend.
  workspace: {
    [key: number]: string | undefined;
  };
  received: {
    [key: number]: RequirementCommentDTO[] | AssignmentCommentDTO[] | undefined;
  };
}

export const initialState: ICommentsState = {
  workspace: {},
  received: {},
};

/**
 * Fetches comments from the backend.
 */
export const getComments = createAsyncThunk(
  'comments/getComments',
  async (payload: { parentId: number; isRequirement: boolean }) => {
    const response = await axios.get<
      (RequirementCommentDTO | AssignmentCommentDTO)[]
    >(
      config.api +
        (payload.isRequirement
          ? 'requirement-comments'
          : 'assignment-comments') +
        '?parent=' +
        payload.parentId
    );
    return response.data;
  }
);

export const sendComment = createAsyncThunk(
  'comments/sendComment',
  async (payload: {
    parentId: number;
    isRequirement: boolean;
    value: string;
  }) => {
    const response = await axios.post<
      RequirementCommentDTO | AssignmentCommentDTO
    >(
      config.api +
        (payload.isRequirement
          ? 'requirement-comments'
          : 'assignment-comments'),
      {
        parentId: payload.parentId,
        value: payload.value,
      }
    );
    return response.data;
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (payload: {
    parentId: number;
    _id: number;
    isRequirement: boolean;
    value: string;
  }) => {
    const response = await axios.put<void>(
      config.api +
        (payload.isRequirement
          ? 'requirement-comments/'
          : 'assignment-comments/') +
        payload._id,
      {
        value: payload.value,
      }
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (payload: { _id: number; isRequirement: boolean }) => {
    const response = await axios.delete<void>(
      config.api +
        (payload.isRequirement
          ? 'requirement-comments/'
          : 'assignment-comments/') +
        payload._id
    );
    return response.data;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    /**
     * Edit workspace value.
     */
    setWorkspace: (
      state,
      action: PayloadAction<{
        parentId: number;
        value: string;
      }>
    ) => {
      if (
        action.payload.value?.trim() === '' &&
        state.workspace[action.payload.parentId] !== undefined
      ) {
        delete state.workspace[action.payload.parentId];
      } else {
        state.workspace[action.payload.parentId] = action.payload.value;
      }
    },
  },
  extraReducers(builder) {
    /**
     * Succeeded to fetch items.
     */
    builder.addCase(getComments.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.received[action.meta.arg.parentId] = action.payload;
      }
    });
    /**
     * Succeeded to send a comment.
     * Clear the workspace.
     */
    builder.addCase(sendComment.fulfilled, (state, action) => {
      delete state.workspace[action.meta.arg.parentId];
    });
    /**
     * Succeeded to update a comment.
     * Clear the workspace.
     */
    builder.addCase(updateComment.fulfilled, (state, action) => {
      delete state.workspace[action.meta.arg.parentId];
    });
  },
});

export const { setWorkspace } = commentsSlice.actions;

export default commentsSlice.reducer;
