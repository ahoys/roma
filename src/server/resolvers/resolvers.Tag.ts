import { Application } from 'express';
import { Tag } from '../models/model.Tag';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { TagDTO } from 'dtos/dto.TagDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const tagResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'tags';

  /**
   * Insert new.
   */
  commonCreateResolver<Tag>({
    endpoint,
    server,
    Dto: TagDTO,
    handleCreate: Tag.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Tag>({
    endpoint: endpoint,
    server,
    ds,
    Model: Tag,
    Dto: TagDTO,
    findManyOptions: (req) => ({
      where: {
        roadmap: {
          _id: getIntFromObject('roadmap', req.query),
        },
      },
    }),
  });

  /**
   * Read one.
   */
  commonReadResolver<Tag>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Tag,
    Dto: TagDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Update existing.
   */
  commonUpdateResolver<Tag, TagDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Tag,
    Dto: TagDTO,
    handleUpdate: Tag.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete existing.
   */
  commonDeleteResolver<Tag>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Tag,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
