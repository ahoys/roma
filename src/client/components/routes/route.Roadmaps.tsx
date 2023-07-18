import React from 'react';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { RouteList } from '../common/RouteList';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setModal } from 'reducers/reducer.modals';
import { useList } from 'hooks/hook.useList';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';

export const Roadmaps = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { data, isLoading } = useList<RoadmapDTO[]>('roadmaps');
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.roadmaps} />
      <RouteList
        actions={[
          {
            id: 'Roadmaps:create',
            name: str.buttons.create,
            icon: faPlus,
            disabled: isLoading,
            onClick: () =>
              dispatch(
                setModal({
                  id: 'Roadmaps:new',
                  type: 'create-new',
                  endpoint: 'roadmaps',
                  title: str.titles.createRoadmap,
                  created: new Date().getTime(),
                })
              ),
          },
        ]}
        rows={data?.map((r) => ({
          id: r._id,
          name: r.name,
          to: `/roadmaps/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
