import React from 'react';
import config from 'config';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { NumberField } from 'components/common/fields/field.NumberField';

interface IProduct {
  name: string;
  gitlabId: number;
}

export const Product = () => {
  const { endpoint, resource } = useMeta('products');
  const { data } = useData<IProduct>(endpoint);
  return (
    <RouteContainer>
      <RouteHeader endpoint={endpoint} />
      <Form endpoint={endpoint} resource={resource}>
        <Columns>
          <TextField endpoint={endpoint} fieldKey={'name'} value={data?.name} />
          {config.features.gitlab ? (
            <NumberField
              endpoint={endpoint}
              fieldKey={'gitlabId'}
              value={data?.gitlabId}
            />
          ) : (
            <></>
          )}
        </Columns>
      </Form>
    </RouteContainer>
  );
};
