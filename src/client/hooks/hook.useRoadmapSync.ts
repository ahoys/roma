import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setRoadmap } from 'reducers/reducer.data';
import { getRoadmapId } from 'utilities/utilities.roadmap';
import { useAppDispatch } from './hook.useAppDispatch';
import { useAppSelector } from './hook.useAppSelector';

/**
 * Keeps the roadmap id of store in sync with the url.
 * Use this only with the App component.
 */
export const useRoadmapSync = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const roadmapIdInStore = useAppSelector((state) => state.data.roadmap);
  useEffect(() => {
    const roadmapIdInUrl = getRoadmapId(pathname);
    if (typeof roadmapIdInUrl === 'number') {
      if (roadmapIdInUrl !== roadmapIdInStore) {
        dispatch(setRoadmap(roadmapIdInUrl));
      }
    }
  }, [pathname]);
};
