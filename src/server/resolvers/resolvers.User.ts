import { Application } from 'express';
import { User } from '../models/model.User';
import { DataSource } from 'typeorm';
import {
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { UserDTO } from 'dtos/dto.UserDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const resolversUser = (server: Application, ds: DataSource) => {
  const endpoint = 'users';

  /**
   * Return identity of the authenticated user.
   */
  commonReadResolver<User>({
    endpoint: 'whoami',
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    findOneOptions: ({ user }) => ({
      where: {
        _id: getIntFromObject('_id', user),
      },
    }),
  });

  /**
   * Read many authenticated.
   */
  commonReadManyResolver<User>({
    endpoint: 'authenticated',
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    findManyOptions: () => ({
      where: {
        admin: true,
      },
    }),
  });

  /**
   * Read many unauthenticated.
   */
  commonReadManyResolver<User>({
    endpoint: 'unauthenticated',
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    findManyOptions: () => ({
      where: {
        admin: false,
      },
    }),
  });

  /**
   * Read many.
   */
  commonReadManyResolver<User>({
    endpoint,
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    findManyOptions: (req) => ({
      where: {
        // Select if user has the given req.query.roadmap in their roadmaps.
        roadmaps: {
          _id: getIntFromObject('roadmap', req.query),
        },
      },
    }),
  });

  /**
   * Read one.
   */
  commonReadResolver<User>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
      relations: {
        assignments: {
          feature: true,
        },
        defaultRoadmap: true,
        roadmaps: true,
      },
    }),
  });

  /**
   * Update.
   */
  commonUpdateResolver<User, UserDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: User,
    Dto: UserDTO,
    handleUpdate: User.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete.
   */
  commonDeleteResolver<User>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: User,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
