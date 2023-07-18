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

  // /**
  //  * Insert new.
  //  */
  // app.post(
  //   config.api + 'requirement-comments',
  //   async ({ body, ...req }, res, next) => {
  //     try {
  //       const requirement = await Requirement.findOneBy({
  //         _id: getIntFromObject('parent', body),
  //       });
  //       const user = await User.findOneBy({
  //         _id: (req.user as User)?._id,
  //       });
  //       const model = new Model();
  //       if (requirement) model.requirement = requirement;
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
  //   config.api + 'requirement-comments',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         requirement: {
  //           _id: getIntFromObject('parent', query),
  //         },
  //       },
  //       take: getIntFromObject('take', query),
  //       skip: getIntFromObject('skip', query),
  //       relations: {
  //         requirement: true,
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
  //   config.api + 'requirement-comments/:id',
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
  //   config.api + 'requirement-comments/:id',
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
  //   config.api + 'requirement-comments/:id',
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
