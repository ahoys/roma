import React from 'react';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { Requirements } from '../common/Requirements';
import { ComboBoxField } from '../common/fields/field.ComboBox';
import { useList } from 'hooks/hook.useList';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { Assignments } from '../common/Assignments';
import { HorizontalDivider } from '../common/HorizontalDivider';
import { ButtonsField } from '../common/fields/field.Buttons';
import { SliderField } from 'components/common/fields/field.SliderField';
import { useStrings } from 'hooks/hook.useStrings';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { ProductDTO } from 'dtos/dto.ProductDTO';
import { TagDTO } from 'dtos/dto.TagDTO';

export const Feature = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { endpoint, resource } = useMeta('features');
  const { data } = useData<FeatureDTO>(endpoint, true, 5120);
  const versions = useList<VersionDTO[]>('versions');
  const versionOptions = versions.data?.map((v) => ({
    id: v._id,
    name: v.codename
      ? `${v.major}.${v.minor} (${v.codename})`
      : `${v.major}.${v.minor}`,
  }));
  const products = useList<ProductDTO[]>('products');
  const productOptions = products.data?.map((v) => ({
    id: v._id,
    name: v.name,
  }));
  const tags = useList<TagDTO[]>('tags');
  const tagOptions = tags.data?.map((v) => ({
    id: v._id,
    name: v.name,
  }));
  /**
   * Sets the version for the feature.
   * A one feature can have a one version or the version can be null.
   */
  const handleVersion = (value: number) => {
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'versionId',
        value,
      })
    );
  };
  const handleProducts = (value: number[]) => {
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'productIds',
        value,
      })
    );
  };
  const handleTags = (value: number[]) => {
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'tagIds',
        value,
      })
    );
  };
  return (
    <RouteContainer>
      <RouteHeader endpoint={endpoint} />
      <Form endpoint={endpoint} resource={resource}>
        <Columns>
          <TextField endpoint={endpoint} fieldKey={'name'} value={data?.name} />
          <ComboBoxField
            endpoint={endpoint}
            fieldKey={'version'}
            fieldKeyModified={'versionId'}
            selected={
              data?.versionId !== undefined
                ? versionOptions.find((v) => v.id === data?.versionId)?.id
                : data?.version?._id
            }
            options={versionOptions}
            canNull={true}
            onChange={handleVersion}
          />
        </Columns>
        <Columns columnsCount={1}>
          <ButtonsField
            endpoint={endpoint}
            fieldKey={'products'}
            selected={data?.productIds || data?.products?.map((p) => p._id)}
            options={productOptions}
            onChange={handleProducts}
          />
          <ButtonsField
            endpoint={endpoint}
            fieldKey={'tags'}
            selected={data?.tagIds || data?.tags?.map((p) => p._id)}
            options={tagOptions}
            onChange={handleTags}
          />
          <SliderField
            endpoint={endpoint}
            fieldKey={'balance'}
            value={data?.balance}
            min={-2}
            max={2}
            minStr={str.inputs.balance_min}
            maxStr={str.inputs.balance_max}
          />
        </Columns>
        <HorizontalDivider />
        <Columns>
          <Requirements feature={data} />
          <Assignments feature={data} />
        </Columns>
      </Form>
    </RouteContainer>
  );
};
