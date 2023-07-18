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

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'requirements', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.value !== undefined) model.value = body.value;
  //     if (typeof body.fulfilled !== undefined) model.fulfilled = body.fulfilled;
  //     if (typeof body.feature !== undefined) model.feature = body.feature;
  //     const validationErrors = await validate(
  //       model,
  //       getDefaultValidatorOptions()
  //     );
  //     if (validationErrors.length === 0) {
  //       await model
  //         .save()
  //         .then(async (result) => res.status(200).send(result))
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
  //   config.api + 'requirements',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         feature: {
  //           _id: getIntFromObject('feature', query),
  //         },
  //       },
  //       relations: {
  //         feature: true,
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
  //   config.api + 'requirements/:id',
  //   async ({ params }, res, next) =>
  //     await Model.findOne({
  //       where: {
  //         _id: Number(params.id),
  //       },
  //       relations: {
  //         feature: true,
  //         comments: true,
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Update existing.
  //  */
  // app.put(
  //   config.api + 'requirements/:id',
  //   async ({ params, body }, res, next) => {
  //     try {
  //       const model = await Model.findOneBy({ _id: Number(params.id) });
  //       if (model) {
  //         if (typeof body.value !== undefined) model.value = body.value;
  //         if (typeof body.fulfilled !== undefined)
  //           model.fulfilled = body.fulfilled;
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
  // app.delete(config.api + 'requirements/:id', async ({ params }, res, next) => {
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
