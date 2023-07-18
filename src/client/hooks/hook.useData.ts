import { useEffect, useRef } from 'react';
import { getData, pollData } from 'reducers/reducer.data';
import { setNotification } from 'reducers/reducer.notifications';
import { useAppDispatch } from './hook.useAppDispatch';
import { useAppSelector } from './hook.useAppSelector';
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate';
import { useStrings } from './hook.useStrings';

/**
 * An easy way to fetch an item from the backend.
 * @param endpoint Name of the resource, i.e. "roadmaps/:id" or "products/:id".
 * @param fetch Whether to fetch new data or only use existing.
 * @param pollInMs How often the data is automatically refreshed.
 * @param notify Whether to notify on updates.
 * @returns The item T or undefined.
 */
export const useData = <T>(
  endpoint: string,
  doFetch = true,
  pollInMs = 0,
  notify = true
) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const data = useAppSelector((state) => state.data.merged[endpoint]);
  const isLoading = useAppSelector((state) => state.data.loading[endpoint]);
  const timeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (doFetch) {
      dispatch(getData({ endpoint }));
    }
  }, [endpoint, doFetch]);
  /**
   * Poll the endpoint.
   */
  useEffect(() => {
    clearTimeout(timeout.current);
    if (pollInMs && data && typeof data._version === 'number') {
      const handlePoll = () => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          dispatch(
            pollData({ endpoint, _version: Number(data._version) })
          ).then((r) => {
            if (notify && r.payload === true) {
              dispatch(
                setNotification({
                  id: `useData:${data._id}:updated`,
                  created: new Date().getTime(),
                  type: 'text',
                  icon: faRotate,
                  value: str.notifications.changes_received,
                })
              );
            }
          });
          handlePoll();
        }, pollInMs);
      };
      handlePoll();
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [data, endpoint, doFetch, pollInMs, notify]);
  return {
    data: data as T | undefined,
    isLoading: isLoading === true || isLoading === undefined,
  };
};
