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

  // /**
  //  * Insert new.
  //  */
  // app.post(
  //   config.api + 'assignment-comments',
  //   async ({ body, ...req }, res, next) => {
  //     try {
  //       const assignment = await Assignment.findOneBy({
  //         _id: getIntFromObject('parent', body),
  //       });
  //       const user = await User.findOneBy({
  //         _id: (req.user as User)?._id,
  //       });
  //       const model = new Model();
  //       if (assignment) model.assignment = assignment;
  //       if (user) model.user = user;
  //       if (typeof body.value !== undefined) model.value = body.value;
  //       const validationErrors = await validate(
  //         model,
  //         getDefaultValidatorOptions()
  //       );
  //       if (validationErrors.length === 0) {
  //         await model
  //           .save()
  //           .then(async (result) => res.status(200).send(result))
  //           .catch((error) => next(error));
  //       } else {
  //         next(validationErrors);
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  // );

  // /**
  //  * Get all.
  //  */
  // app.get(
  //   config.api + 'assignment-comments',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         assignment: {
  //           _id: getIntFromObject('parent', query),
  //         },
  //       },
  //       take: getIntFromObject('take', query),
  //       skip: getIntFromObject('skip', query),
  //       relations: {
  //         assignment: true,
  //         user: true,
  //       },
  //       order: {
  //         _created_at: 'DESC',
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Get one.
  //  */
  // app.get(
  //   config.api + 'assignment-comments/:id',
  //   async ({ params }, res, next) =>
  //     await Model.findOne({
  //       where: {
  //         _id: Number(params.id),
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Update existing.
  //  */
  // app.put(
  //   config.api + 'assignment-comments/:id',
  //   async ({ params, body, user }, res, next) => {
  //     try {
  //       const model = await Model.findOne({
  //         where: {
  //           _id: getIntFromObject('id', params),
  //           user: {
  //             _id: (user as User)?._id,
  //           },
  //         },
  //         relations: {
  //           user: true,
  //         },
  //       });
  //       if (model) {
  //         if (typeof body.value !== undefined) model.value = body.value;
  //         const validationErrors = await validate(model, {
  //           skipMissingProperties: true,
  //           whitelist: true,
  //           forbidNonWhitelisted: true,
  //         });
  //         if (validationErrors.length === 0) {
  //           await model
  //             .save()
  //             .then(async (result) => res.status(200).send(result))
  //             .catch((error) => next(error));
  //         } else {
  //           next(validationErrors);
  //         }
  //       } else {
  //         res.status(404).end();
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  // );

  // /**
  //  * Delete existing.
  //  */
  // app.delete(
  //   config.api + 'assignment-comments/:id',
  //   async ({ params, user }, res, next) => {
  //     try {
  //       const model = await Model.findOne({
  //         where: {
  //           _id: getIntFromObject('id', params),
  //           user: {
  //             _id: (user as User)?._id,
  //           },
  //         },
  //         relations: {
  //           user: true,
  //         },
  //       });
  //       if (model) {
  //         await model
  //           .remove()
  //           .then(() => res.status(200).end())
  //           .catch((error) => next(error));
  //       } else {
  //         res.status(404).end();
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  // );
};
