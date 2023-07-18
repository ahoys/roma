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

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'assignments', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.workHoursEstimate !== undefined)
  //       model.workHoursEstimate = body.workHoursEstimate;
  //     if (typeof body.hourPrice !== undefined) model.hourPrice = body.hourPrice;
  //     if (typeof body.done !== undefined) model.done = body.done;
  //     if (typeof body.feature !== undefined) model.feature = body.feature;
  //     if (typeof body.user !== undefined) model.user = body.user;
  //     const validationErrors = await validate(
  //       model,
  //       getDefaultValidatorOptions()
  //     );
  //     if (validationErrors.length === 0) {
  //       await model
  //         .save()
  //         .then(async (result) => {
  //           if (body.comment !== undefined) {
  //             const comment = new AssignmentComment();
  //             comment.assignment = result;
  //             comment.value = body.comment;
  //             comment.user = result.user;
  //             const validationErrorsOnComment = await validate(
  //               comment,
  //               getDefaultValidatorOptions()
  //             );
  //             if (validationErrorsOnComment.length === 0) {
  //               comment
  //                 .save()
  //                 .then(() => res.status(200).send(result))
  //                 .catch((error) => next(error));
  //             } else {
  //               next(validationErrorsOnComment);
  //             }
  //           } else {
  //             res.status(200).send(result);
  //           }
  //         })
  //         .catch((error) => next(error));
  //     } else {
  //       next(validationErrors);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  // /**
  //  * Get all.
  //  */
  // app.get(
  //   config.api + 'assignments',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         feature: {
  //           _id: getIntFromObject('feature', query),
  //         },
  //         user: {
  //           _id: getIntFromObject('user', query),
  //         },
  //         done: Boolean(getStringFromObject('done', query)),
  //       },
  //       relations: {
  //         feature: true,
  //         user: true,
  //       },
  //       take: getIntFromObject('take', query),
  //       skip: getIntFromObject('skip', query),
  //       order: {
  //         _id: 'DESC',
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Get one.
  //  */
  // app.get(
  //   config.api + 'assignments/:id',
  //   async ({ params }, res, next) =>
  //     await Model.findOne({
  //       where: {
  //         _id: Number(params.id),
  //       },
  //       relations: {
  //         feature: true,
  //         user: true,
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Update existing.
  //  */
  // app.put(
  //   config.api + 'assignments/:id',
  //   async ({ params, body }, res, next) => {
  //     try {
  //       const model = await Model.findOneBy({ _id: Number(params.id) });
  //       if (model) {
  //         if (typeof body.workHoursEstimate !== undefined)
  //           model.workHoursEstimate = body.workHoursEstimate;
  //         if (typeof body.hourPrice !== undefined)
  //           model.hourPrice = body.hourPrice;
  //         if (typeof body.done !== undefined) model.done = body.done;
  //         const validationErrors = await validate(model, {
  //           skipMissingProperties: true,
  //           whitelist: true,
  //           forbidNonWhitelisted: true,
  //         });
  //         if (validationErrors.length === 0) {
  //           model
  //             .save()
  //             .then((result) => res.status(200).send(result))
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
  // app.delete(config.api + 'assignments/:id', async ({ params }, res, next) => {
  //   try {
  //     const model = await Model.findOne({
  //       where: {
  //         _id: getIntFromObject('id', params),
  //       },
  //       relations: {
  //         feature: true,
  //       },
  //     });
  //     if (model) {
  //       await model
  //         .remove()
  //         .then(() => {
  //           Feature.update({ _id: model.feature._id }, {});
  //           res.status(200).end();
  //         })
  //         .catch((error) => next(error));
  //     } else {
  //       res.status(404).end();
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // });
};
