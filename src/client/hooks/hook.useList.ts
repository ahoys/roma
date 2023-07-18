import { useEffect } from 'react';
import { getList } from 'reducers/reducer.data';
import { useAppDispatch } from './hook.useAppDispatch';
import { useAppSelector } from './hook.useAppSelector';

/**
 * An easy way to fetch a list of items from the backend.
 * @param endpoint Name of the resource, i.e. "roadmaps" or "products".
 * @param doFetch Whether to fetch new values or not.
 * @returns The list T.
 */
export const useList = <T>(
  endpoint: string | undefined,
  doFetch = true
): {
  data: T;
  isLoading: boolean;
} => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.data.lists[endpoint ?? '']);
  const isLoading = useAppSelector(
    (state) => state.data.loading[endpoint ?? '']
  );
  useEffect(() => {
    if (doFetch && endpoint !== undefined) {
      dispatch(getList({ endpoint }));
    }
  }, [endpoint, doFetch]);
  return {
    data: (Array.isArray(list) ? list : []) as T,
    isLoading: isLoading === true || isLoading === undefined,
  };
};
