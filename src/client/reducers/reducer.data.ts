import axios, { AxiosError } from 'axios';
import config from 'config';
import produce from 'immer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';

type TEndpoint = string;
type TFieldKey = string;
type TResource = string;

interface IListEntry {
  [key: string]: unknown;
}

interface IData {
  [key: TEndpoint]:
    | {
        [key: TFieldKey]: unknown | undefined;
      }
    | undefined;
}

export interface IDataState {
  original: IData;
  modified: IData;
  merged: IData;
  lists: {
    [key: TResource]: IListEntry[] | undefined;
  };
  loading: {
    [key: TEndpoint | TResource]: boolean | undefined;
  };
  roadmap: RoadmapDTO['_id'] | undefined;
}

export const initialState: IDataState = {
  original: {},
  modified: {},
  merged: {},
  lists: {},
  loading: {},
  roadmap: undefined,
};

/**
 * Fetches data from the backend.
 */
export const getData = createAsyncThunk(
  'data/getData',
  async (
    payload: {
      endpoint: string;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      slice.actions.setLoading({
        endpoint: payload.endpoint,
        isLoading: true,
      })
    );
    axios
      .get<IData | undefined>(config.api + payload.endpoint)
      .then(({ data }) => {
        if (typeof data === 'object') {
          thunkAPI.dispatch(
            slice.actions.receiveData({
              endpoint: payload.endpoint,
              data,
            })
          );
        }
      })
      .catch((err) => {
        console.error(err.code ?? 'Unknown error.');
      })
      .finally(() => {
        thunkAPI.dispatch(
          slice.actions.setLoading({
            endpoint: payload.endpoint,
            isLoading: false,
          })
        );
      });
  }
);

/**
 * Fetches data from the backend.
 */
export const pollData = createAsyncThunk(
  'data/pollData',
  async (
    payload: {
      endpoint: string;
      _version: number;
    },
    thunkAPI
  ) => {
    const versionQuery = payload.endpoint.includes('?')
      ? `&_version=${payload._version}`
      : `?_version=${payload._version}`;
    const res = await axios
      .get<IData | undefined>(config.api + payload.endpoint + versionQuery)
      .then(({ data }) => {
        if (typeof data === 'object') {
          thunkAPI.dispatch(
            slice.actions.receiveData({
              endpoint: payload.endpoint,
              data,
            })
          );
        }
        return data;
      })
      .catch((err) => {
        // 304 means that the data has not changed since the last poll.
        if (err.response?.status !== 304) {
          console.error(err.code ?? 'Unknown error.');
        }
      });
    return typeof res?._version === 'number';
  }
);

/**
 * Either updates or saves data, depending on whether the
 * data already exists as an original source.
 */
export const saveData = createAsyncThunk(
  'data/saveData',
  async (
    payload: {
      endpoint: string;
      resource?: string;
      data?: { [key: string]: unknown };
      forceUpdate?: boolean;
      onSuccess?: () => void;
      onFailure?: (err: AxiosError) => void;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      slice.actions.setLoading({
        endpoint: payload.endpoint,
        isLoading: true,
      })
    );
    const state = (thunkAPI.getState() as TRootState).data;
    const original = state.original[payload.endpoint];
    const modified = state.modified[payload.endpoint];
    axios<IData>({
      method: original || payload.forceUpdate ? 'PUT' : 'POST',
      url: config.api + payload.endpoint,
      data: {
        ...(original ? {} : { roadmapId: state.roadmap }),
        ...modified,
        ...payload.data,
      },
    })
      .then(() => {
        thunkAPI.dispatch(
          slice.actions.resetData({
            endpoint: payload.endpoint,
          })
        );
        if (payload.resource) {
          thunkAPI.dispatch(
            getList({
              endpoint: payload.resource,
            })
          );
        }
        if (payload.onSuccess) payload.onSuccess();
      })
      .catch((err: AxiosError) => {
        console.error(err.code ?? 'Unknown error.');
        if (payload.onFailure) payload.onFailure(err);
      })
      .finally(() => {
        thunkAPI.dispatch(
          slice.actions.setLoading({
            endpoint: payload.endpoint,
            isLoading: false,
          })
        );
      });
  }
);

/**
 * Removes a singular item.
 */
export const removeData = createAsyncThunk(
  'data/removeData',
  async (payload: {
    endpoint: string;
    onSuccess?: () => void;
    onFailure?: (error: AxiosError) => void;
  }) => {
    axios({
      method: 'DELETE',
      url: config.api + payload.endpoint,
    })
      .then(() => {
        if (payload.onSuccess) payload.onSuccess();
      })
      .catch((err: AxiosError) => {
        if (payload.onFailure) payload.onFailure(err);
      });
  }
);

/**
 * Fetches a list from an endpoint.
 */
export const getList = createAsyncThunk(
  'data/getList',
  async (
    payload: {
      endpoint: string;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      slice.actions.setLoading({
        endpoint: payload.endpoint,
        isLoading: true,
      })
    );
    const state = (thunkAPI.getState() as TRootState).data;
    const roadmap = state.roadmap;
    const q = payload.endpoint.includes('?') ? '&' : '?';
    axios
      .get<RoadmapDTO | undefined>(
        config.api +
          payload.endpoint +
          (roadmap ? q + `roadmap=${roadmap}` : '')
      )
      .then(({ data }) => {
        if (Array.isArray(data)) {
          thunkAPI.dispatch(
            slice.actions.setList({ endpoint: payload.endpoint, data })
          );
        }
      })
      .catch((err) => {
        console.error(err.code ?? 'Unknown error.');
      })
      .finally(() => {
        thunkAPI.dispatch(
          slice.actions.setLoading({
            endpoint: payload.endpoint,
            isLoading: false,
          })
        );
      });
  }
);

/**
 * Updates value of a field.
 */
export const modifyData = createAsyncThunk(
  'data/modifyData',
  async (
    payload: {
      endpoint: string;
      fieldKey: string;
      value: unknown;
    },
    thunkAPI
  ) =>
    thunkAPI.dispatch(
      slice.actions.modifyData({
        endpoint: payload.endpoint,
        fieldKey: payload.fieldKey,
        value: payload.value,
      })
    )
);

/**
 * Will reset modified data back to original.
 */
export const resetData = createAsyncThunk(
  'data/resetData',
  async (
    payload: {
      endpoint: string;
      onSuccess?: () => void;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      slice.actions.resetData({
        endpoint: payload.endpoint,
      })
    );
    if (payload.onSuccess) {
      payload.onSuccess();
    }
  }
);

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    /**
     * Receives dialog data
     * that can be modified.
     */
    receiveData: (
      state,
      action: PayloadAction<{
        endpoint: string;
        data: IData;
      }>
    ) => {
      const { endpoint, data } = action.payload;
      state.original[endpoint] = data;
      const modified = state.modified[endpoint];
      if (modified) {
        // Make sure modifys are not overriden, but
        // if the new data contains same values,
        // make the keys no more to be modified.
        for (const key of Object.keys(modified)) {
          if (
            ['string', 'number', 'boolean'].includes(typeof modified[key]) &&
            modified[key] === data[key]
          ) {
            delete modified[key];
          }
        }
        state.modified[endpoint] = modified;
        state.merged[endpoint] = { ...data, ...modified };
      } else {
        state.merged[endpoint] = data;
      }
    },
    /**
     * Modifies dialog data that can both
     * already exist or not.
     */
    modifyData: (
      state,
      action: PayloadAction<{
        endpoint: string;
        fieldKey: string;
        value: unknown;
      }>
    ) => {
      const { endpoint, fieldKey, value } = action.payload;
      state.merged = produce(state.merged, (draftMerged) => {
        const target = draftMerged[endpoint] || {};
        target[fieldKey] = value;
        draftMerged[endpoint] = target;
      });
      state.modified = produce(state.modified, (draftModified) => {
        const modified = draftModified[endpoint] ? draftModified[endpoint] : {};
        if (modified) {
          modified[fieldKey] = value;
        }
        draftModified[endpoint] = modified;
      });
    },
    /**
     * Resets modified/merged data to original.
     */
    resetData: (state, action: PayloadAction<{ endpoint: string }>) => {
      const original = state.original[action.payload.endpoint];
      if (state.modified[action.payload.endpoint]) {
        if (original) {
          state.merged[action.payload.endpoint] = original;
        } else {
          delete state.merged[action.payload.endpoint];
        }
        delete state.modified[action.payload.endpoint];
      }
    },
    /**
     * Sets a list.
     */
    setList: (
      state,
      action: PayloadAction<{
        endpoint: string;
        data: IListEntry[];
      }>
    ) => {
      state.lists[action.payload.endpoint] = action.payload.data;
    },
    /**
     * Sets the currently active roadmap.
     */
    setRoadmap: (state, action: PayloadAction<IDataState['roadmap']>) => {
      state.roadmap = action.payload;
    },
    /**
     * Sets endpoint to be loading or not.
     */
    setLoading: (
      state,
      action: PayloadAction<{
        endpoint: string;
        isLoading: boolean;
      }>
    ) => {
      state.loading[action.payload.endpoint] = action.payload.isLoading;
    },
  },
});

export const { setRoadmap } = slice.actions;

export default slice.reducer;
