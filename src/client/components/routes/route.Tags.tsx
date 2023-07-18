import React from 'react';
import config from 'config';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { RouteList } from '../common/RouteList';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setModal } from 'reducers/reducer.modals';
import { useList } from 'hooks/hook.useList';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { TagDTO } from 'dtos/dto.TagDTO';

export const Tags = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { data, isLoading } = useList<TagDTO[]>('tags');
  const roadmap = useAppSelector((state) => state.data.roadmap);
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.tags} />
      <RouteList
        baseUrl={`${config.publicPath}r/${roadmap}`}
        actions={[
          {
            id: 'Tags:create',
            name: str.buttons.create,
            icon: faPlus,
            disabled: isLoading,
            onClick: () =>
              dispatch(
                setModal({
                  id: 'Tags:new',
                  type: 'create-new',
                  endpoint: 'tags',
                  title: str.titles.createTag,
                  created: new Date().getTime(),
                })
              ),
          },
        ]}
        rows={data?.map((r) => ({
          id: r._id,
          name: r.name,
          to: `/tags/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
