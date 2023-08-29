import { Application } from 'express';
import { Product } from '../models/model.Product';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { ProductDTO } from 'dtos/dto.ProductDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const productResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'products';

  /**
   * Insert new.
   */
  commonCreateResolver<Product>({
    endpoint,
    server,
    Dto: ProductDTO,
    handleCreate: Product.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Product>({
    endpoint,
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    findManyOptions: (req) => {
      const roadmapId = getIntFromObject('roadmap', req.query);
      if (typeof roadmapId === 'number') {
        return {
          where: {
            roadmap: {
              _id: roadmapId,
            },
          },
        };
      }
      return {};
    },
  });

  /**
   * Read one.
   */
  commonReadResolver<Product>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Update one.
   */
  commonUpdateResolver<Product, ProductDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    handleUpdate: Product.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete one.
   */
  commonDeleteResolver<Product>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
