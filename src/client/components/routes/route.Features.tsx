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
import { FeatureDTO } from 'dtos/dto.FeatureDTO';

export const Features = () => {
  const [version, setVersion] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const str = useStrings();
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const endpoint =
    version === -1 || version === undefined
      ? 'features'
      : 'features?version=' + (version || '');
  const versions = useList<VersionDTO[]>('versions');
  const features = useList<FeatureDTO[]>(
    endpoint,
    !versions.isLoading && version !== undefined
  );
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.features} />
      <RouteList
        baseUrl={`${config.publicPath}r/${roadmap}`}
        dependency={{
          id: 'Features:dependency',
          title: str.registers.version,
          options: versions.data.map((r) => ({
            id: r._id,
            name: `${r.major}.${r.minor}`,
          })),
          selected: version,
          canNull: true,
          handleChange: (id) => setVersion(id),
        }}
        actions={[
          {
            id: 'Features:create',
            name: str.buttons.create,
            icon: faPlus,
            disabled:
              versions.isLoading ||
              (features.isLoading && version !== undefined),
            onClick: () =>
              dispatch(
                setModal({
                  id: 'Features:new',
                  type: 'create-new-feature',
                  endpoint: 'features',
                  resource: endpoint,
                  versionId: version,
                  title: str.titles.createFeature,
                  created: new Date().getTime(),
                })
              ),
          },
        ]}
        rows={features.data?.map((r) => ({
          id: r._id,
          name: r.name,
          to: `/features/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
