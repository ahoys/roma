import React from 'react';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { SwitchField } from '../common/fields/field.SwitchField';
import { NumberField } from 'components/common/fields/field.NumberField';
import { HorizontalDivider } from 'components/common/HorizontalDivider';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { ProgressFeatures } from 'components/common/progress/ProgressFeatures';
import { useStrings } from 'hooks/hook.useStrings';

export const Version = () => {
  const str = useStrings();
  const { endpoint, resource } = useMeta('versions');
  const { data } = useData<VersionDTO>(endpoint);
  return (
    <RouteContainer>
      <RouteHeader
        endpoint={endpoint}
        value={
          data
            ? data.codename
              ? `${data?.major}.${data?.minor} (${data.codename})`
              : `${data?.major}.${data?.minor}`
            : ''
        }
      />
      <Form endpoint={endpoint} resource={resource}>
        <Columns>
          <NumberField
            endpoint={endpoint}
            fieldKey={'major'}
            value={data?.major}
            max={10240}
            min={0}
          />
          <NumberField
            endpoint={endpoint}
            fieldKey={'minor'}
            value={data?.minor}
            max={10240}
            min={0}
          />
          <TextField
            endpoint={endpoint}
            fieldKey={'codename'}
            value={data?.codename}
          />
        </Columns>
        <HorizontalDivider />
        <Columns>
          <SwitchField
            endpoint={endpoint}
            fieldKey={'archived'}
            value={data?.archived}
          />
        </Columns>
      </Form>
      <HorizontalDivider />
      <h2>{str.titles.features}</h2>
      {data && <ProgressFeatures version={data} />}
    </RouteContainer>
  );
};
