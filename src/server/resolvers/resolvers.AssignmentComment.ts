import { Application } from 'express';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonUpdateResolver,
} from './resolvers';
import { AssignmentCommentDTO } from 'dtos/dto.AssignmentCommentDTO';
import { AssignmentComment } from '../models/model.AssignmentComment';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const assignmentCommentResolvers = (
  server: Application,
  ds: DataSource
) => {
  const endpoint = 'assignment-comments';

  /**
   * Insert new.
   */
  commonCreateResolver<AssignmentComment>({
    endpoint,
    server,
    Dto: AssignmentCommentDTO,
    handleCreate: AssignmentComment.handleCreate,
    options: {
      readRequestUserToBody: true,
    },
  });

  /**
   * Read many.
   */
  commonReadManyResolver<AssignmentComment>({
    endpoint,
    server,
    ds,
    Model: AssignmentComment,
    Dto: AssignmentCommentDTO,
    findManyOptions: (req) => ({
      where: {
        assignment: {
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
  commonUpdateResolver<AssignmentComment, AssignmentCommentDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: AssignmentComment,
    Dto: AssignmentCommentDTO,
    options: {
      stripUserFromBody: true,
    },
    handleUpdate: AssignmentComment.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete existing.
   */
  commonDeleteResolver<AssignmentComment>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: AssignmentComment,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });
};
