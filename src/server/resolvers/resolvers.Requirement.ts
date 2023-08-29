import { Application } from 'express';
import { Requirement } from '../models/model.Requirement';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { RequirementDTO } from 'dtos/dto.RequirementDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const requirementResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'requirements';

  /**
   * Insert new.
   */
  commonCreateResolver<Requirement>({
    endpoint,
    server,
    Dto: RequirementDTO,
    handleCreate: Requirement.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Requirement>({
    endpoint,
    server,
    ds,
    Model: Requirement,
    Dto: RequirementDTO,
    findManyOptions: () => ({}),
  });

  /**
   * Read one.
   */
  commonReadResolver<Requirement>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Requirement,
    Dto: RequirementDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Update.
   */
  commonUpdateResolver<Requirement, RequirementDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Requirement,
    Dto: RequirementDTO,
    handleUpdate: Requirement.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete.
   */
  commonDeleteResolver<Requirement>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Requirement,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
