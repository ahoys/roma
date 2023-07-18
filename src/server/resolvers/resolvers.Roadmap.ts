import { Application } from 'express';
import { Roadmap } from '../models/model.Roadmap';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const roadmapResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'roadmaps';

  /**
   * Insert new.
   */
  commonCreateResolver<Roadmap>({
    endpoint,
    server,
    Dto: RoadmapDTO,
    handleCreate: Roadmap.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Roadmap>({
    endpoint,
    server,
    ds,
    Model: Roadmap,
    Dto: RoadmapDTO,
    findManyOptions: () => ({}),
  });

  /**
   * Read one.
   */
  commonReadResolver<Roadmap>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Roadmap,
    Dto: RoadmapDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Update existing.
   */
  commonUpdateResolver<Roadmap, RoadmapDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Roadmap,
    Dto: RoadmapDTO,
    handleUpdate: Roadmap.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete existing.
   */
  commonDeleteResolver<Roadmap>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Roadmap,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'roadmaps', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.name !== undefined) model.name = body.name;
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
  // app.get(config.api + 'roadmaps', async ({ query }, res, next) => {
  //   await Model.find({
  //     take: getIntFromObject('take', query),
  //     skip: getIntFromObject('skip', query),
  //     order: {
  //       name: 'ASC',
  //       _id: 'DESC',
  //     },
  //   })
  //     .then((result) => res.send(result))
  //     .catch((error) => next(error));
  // });

  // /**
  //  * Get one.
  //  */
  // app.get(
  //   config.api + 'roadmaps/:id',
  //   async ({ params }, res, next) =>
  //     await Model.findOne({
  //       where: {
  //         _id: Number(params.id),
  //       },
  //       relations: {
  //         versions: {
  //           features: {
  //             tags: true,
  //             assignments: {
  //               user: true,
  //             },
  //           },
  //         },
  //         products: true,
  //         tags: true,
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Update existing.
  //  */
  // app.put(config.api + 'roadmaps/:id', async ({ params, body }, res, next) => {
  //   try {
  //     const model = await Model.findOneBy({ _id: Number(params.id) });
  //     if (model) {
  //       if (typeof body.name !== undefined) model.name = body.name;
  //       const validationErrors = await validate(model, {
  //         skipMissingProperties: true,
  //         whitelist: true,
  //         forbidNonWhitelisted: true,
  //       });
  //       if (validationErrors.length === 0) {
  //         await model
  //           .save()
  //           .then(async (result) => res.status(200).send(result))
  //           .catch((error) => next(error));
  //       } else {
  //         next(validationErrors);
  //       }
  //     } else {
  //       res.status(404).end();
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  // /**
  //  * Delete existing.
  //  */
  // app.delete(
  //   config.api + 'roadmaps/:id',
  //   async ({ params }, res, next) =>
  //     await Model.delete({
  //       _id: Number(params.id),
  //     })
  //       .then(() => res.status(200).end())
  //       .catch((error) => next(error))
  // );
};
