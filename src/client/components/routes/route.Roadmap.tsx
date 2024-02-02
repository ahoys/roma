import React from 'react';
import config from 'config';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';

export const Roadmap = () => {
  const { endpoint, resource } = useMeta('roadmaps');
  const { data } = useData<RoadmapDTO>(endpoint);
  return (
    <RouteContainer>
      <RouteHeader endpoint={endpoint} />
      <Form endpoint={endpoint} resource={resource}>
        <Columns columnsCount={1}>
          <TextField endpoint={endpoint} fieldKey={'name'} value={data?.name} />
          {config.features.gitlab ? (
            <TextField
              endpoint={endpoint}
              fieldKey={'gitlabAccessToken'}
              value={data?.gitlabAccessToken}
              type={'password'}
            />
          ) : (
            <></>
          )}
        </Columns>
      </Form>
    </RouteContainer>
  );
};
