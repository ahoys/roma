import React from 'react';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { NumberField } from '../common/fields/field.NumberField';

interface ITag {
  name: string;
  weight: number;
  color: string;
}

export const Tag = () => {
  const { endpoint, resource } = useMeta('tags');
  const { data } = useData<ITag>(endpoint);
  return (
    <RouteContainer>
      <RouteHeader endpoint={endpoint} />
      <Form endpoint={endpoint} resource={resource}>
        <Columns>
          <TextField endpoint={endpoint} fieldKey={'name'} value={data?.name} />
          <NumberField
            endpoint={endpoint}
            fieldKey={'weight'}
            value={data?.weight}
            min={0}
            max={10240}
          />
        </Columns>
      </Form>
    </RouteContainer>
  );
};
