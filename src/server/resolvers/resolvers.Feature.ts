import { Application } from 'express';
import { DataSource, Not } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';
import { Feature } from '../models/model.Feature';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const featureResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'features';

  /**
   * Insert new.
   */
  commonCreateResolver<Feature>({
    endpoint,
    server,
    Dto: FeatureDTO,
    handleCreate: Feature.handleCreate,
  });

  /**
   * Get all.
   */
  commonReadManyResolver<Feature>({
    endpoint,
    server,
    ds,
    Model: Feature,
    Dto: FeatureDTO,
    findManyOptions: (req) => ({
      where: {
        version: {
          _id: getIntFromObject('version', req.query),
        },
      },
      relations: {
        tags: true,
        assignments: {
          user: true,
        },
        requirements: true,
      },
    }),
  });

  /**
   * Get one feature.
   */
  commonReadResolver<Feature>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Feature,
    Dto: FeatureDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
        // Used with polling to avoid getting the same data again.
        _version: Not(getIntFromObject('_version', req.query) ?? -1),
      },
      relations: {
        version: true,
        products: true,
        tags: true,
        assignments: {
          user: true,
        },
        requirements: true,
      },
    }),
  });

  /**
   * Update existing.
   */
  commonUpdateResolver<Feature, FeatureDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Feature,
    Dto: FeatureDTO,
    handleUpdate: Feature.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete existing.
   */
  commonDeleteResolver<Feature>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Feature,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
