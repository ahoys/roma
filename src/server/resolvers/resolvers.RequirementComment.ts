import { Application } from 'express';
import { RequirementComment } from '../models/model.RequirementComment';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonUpdateResolver,
} from './resolvers';
import { RequirementCommentDTO } from 'dtos/dto.RequirementCommentDTO';
import { DataSource } from 'typeorm';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const requirementCommentResolvers = (
  server: Application,
  ds: DataSource
) => {
  const endpoint = 'requirement-comments';

  /**
   * Insert new.
   */
  commonCreateResolver<RequirementComment>({
    endpoint,
    server,
    Dto: RequirementCommentDTO,
    handleCreate: RequirementComment.handleCreate,
    options: {
      readRequestUserToBody: true,
    },
  });

  /**
   * Read many.
   */
  commonReadManyResolver<RequirementComment>({
    endpoint,
    server,
    ds,
    Model: RequirementComment,
    Dto: RequirementCommentDTO,
    findManyOptions: (req) => ({
      where: {
        requirement: {
          _id: getIntFromObject('parent', req.query),
        },
      },
      order: {
        _created_at: 'DESC',
      },
    }),
  });

  /**
   * Update existing.
   */
  commonUpdateResolver<RequirementComment, RequirementCommentDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: RequirementComment,
    Dto: RequirementCommentDTO,
    options: {
      stripUserFromBody: true,
    },
    handleUpdate: RequirementComment.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete existing.
   */
  commonDeleteResolver<RequirementComment>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: RequirementComment,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
