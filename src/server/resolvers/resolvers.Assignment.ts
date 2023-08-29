import { Application } from 'express';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { AssignmentDTO } from 'dtos/dto.AssignmentDTO';
import { Assignment } from '../models/model.Assignment';
import { DataSource, FindManyOptions } from 'typeorm';
import {
  getIntFromObject,
  getStringFromObject,
} from '../utilities/utilities.resolvers';

export const assignmentResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'assignments';

  /**
   * Insert new.
   */
  commonCreateResolver<Assignment>({
    endpoint,
    server,
    Dto: AssignmentDTO,
    handleCreate: Assignment.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Assignment>({
    endpoint,
    server,
    ds,
    Model: Assignment,
    Dto: AssignmentDTO,
    findManyOptions: (req) => {
      const payload: FindManyOptions = {
        relations: {
          feature: true,
          user: true,
        },
      };
      const userId = getIntFromObject('user', req.query);
      const done = getStringFromObject('done', req.query);
      if (typeof userId === 'number') {
        payload.where = {
          ...(typeof done === 'string' ? { done: done === 'true' } : {}),
          user: {
            _id: userId,
          },
        };
      }
      return payload;
    },
  });

  /**
   * Read one.
   */
  commonReadResolver<Assignment>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Assignment,
    Dto: AssignmentDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
      relations: {
        feature: true,
        user: true,
      },
    }),
  });

  /**
   * Update.
   */
  commonUpdateResolver<Assignment, AssignmentDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Assignment,
    Dto: AssignmentDTO,
    handleUpdate: Assignment.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete.
   */
  commonDeleteResolver<Assignment>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Assignment,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
