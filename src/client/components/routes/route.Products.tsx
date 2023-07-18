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
import { ProductDTO } from 'dtos/dto.ProductDTO';

export const Products = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { data, isLoading } = useList<ProductDTO[]>('products');
  const roadmap = useAppSelector((state) => state.data.roadmap);
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.products} />
      <RouteList
        baseUrl={`${config.publicPath}r/${roadmap}`}
        actions={[
          {
            id: 'Products:create',
            name: str.buttons.create,
            icon: faPlus,
            disabled: isLoading,
            onClick: () =>
              dispatch(
                setModal({
                  id: 'Products:new',
                  type: 'create-new',
                  endpoint: 'products',
                  title: str.titles.createProduct,
                  created: new Date().getTime(),
                })
              ),
          },
        ]}
        rows={data?.map((r) => ({
          id: r._id,
          name: r.name,
          to: `/products/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
