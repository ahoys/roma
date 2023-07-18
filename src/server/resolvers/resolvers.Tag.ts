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

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'tags', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.name !== undefined) model.name = body.name;
  //     if (typeof body.weight !== undefined) model.weight = body.weight;
  //     if (typeof body.roadmap !== undefined) model.roadmap = body.roadmap;
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
  //   config.api + 'tags',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         roadmap: {
  //           _id: getIntFromObject('roadmap', query),
  //         },
  //       },
  //       take: getIntFromObject('take', query),
  //       skip: getIntFromObject('skip', query),
  //       order: {
  //         name: 'ASC',
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
  //   config.api + 'tags/:id',
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
  // app.put(config.api + 'tags/:id', async ({ params, body }, res, next) => {
  //   try {
  //     const model = await Model.findOneBy({ _id: Number(params.id) });
  //     if (model) {
  //       if (typeof body.name !== undefined) model.name = body.name;
  //       if (typeof body.weight !== undefined) model.weight = body.weight;
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
  //   config.api + 'tags/:id',
  //   async ({ params }, res, next) =>
  //     await Model.delete({
  //       _id: Number(params.id),
  //     })
  //       .then(() => res.status(200).end())
  //       .catch((error) => next(error))
  // );
};
