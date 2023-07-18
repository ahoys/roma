import React, { useState } from 'react';
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
import { VersionDTO } from 'dtos/dto.VersionDTO';

export const Versions = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const [archive, setArchive] = useState<number>(1);
  const archiveQuery =
    archive >= 0 ? `?archived=${archive === 0 ? 'true' : 'false'}` : '';
  const endpoint = `versions${archiveQuery}`;
  const { data, isLoading } = useList<VersionDTO[]>(endpoint);
  const roadmap = useAppSelector((state) => state.data.roadmap);
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.versions} />
      <RouteList
        baseUrl={`${config.publicPath}r/${roadmap}`}
        dependency={{
          id: 'Versions:dependency',
          title: str.fields.archival,
          options: [
            {
              id: 0,
              name: str.options.archived,
            },
            {
              id: 1,
              name: str.options.nonArchived,
            },
          ],
          selected: archive,
          canNull: true,
          handleChange: setArchive,
        }}
        actions={[
          {
            id: 'Versions:create',
            name: str.buttons.create,
            icon: faPlus,
            disabled: isLoading,
            onClick: () =>
              dispatch(
                setModal({
                  id: 'Versions:new',
                  type: 'create-new-version',
                  endpoint,
                  title: str.titles.createVersion,
                  created: new Date().getTime(),
                })
              ),
          },
        ]}
        rows={data?.map((r) => ({
          id: r._id,
          name: r.codename
            ? `${r.major}.${r.minor} (${r.codename})`
            : `${r.major}.${r.minor}`,
          to: `/versions/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
