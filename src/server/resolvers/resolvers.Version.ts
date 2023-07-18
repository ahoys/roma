import { Application } from 'express';
import { Version } from '../models/model.Version';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { DataSource } from 'typeorm';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import {
  getIntFromObject,
  getStringFromObject,
} from '../utilities/utilities.resolvers';

export const versionResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'versions';

  commonCreateResolver<Version>({
    endpoint,
    server,
    Dto: VersionDTO,
    handleCreate: Version.handleCreate,
  });

  commonReadManyResolver<Version>({
    endpoint,
    server,
    ds,
    Model: Version,
    Dto: VersionDTO,
    findManyOptions: (req) => ({
      where: {
        ...(getStringFromObject('archived', req.query)
          ? { archived: getStringFromObject('archived', req.query) === 'true' }
          : {}),
        roadmap: {
          _id: getIntFromObject('roadmap', req.query),
        },
      },
      relations: {
        features: {
          assignments: true,
        },
      },
    }),
  });

  commonReadResolver<Version>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Version,
    Dto: VersionDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
      relations: {
        features: true,
      },
    }),
  });

  commonUpdateResolver<Version, VersionDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Version,
    Dto: VersionDTO,
    handleUpdate: Version.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  commonDeleteResolver<Version>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Version,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'versions', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.major !== undefined) model.major = body.major;
  //     if (typeof body.minor !== undefined) model.minor = body.minor;
  //     if (typeof body.codename !== undefined) model.codename = body.codename;
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
  //   config.api + 'versions',
  //   async ({ query }, res, next) =>
  //     await Model.find({
  //       where: {
  //         ...(getStringFromObject('archived', query) === 'true'
  //           ? {}
  //           : { archived: false }),
  //         roadmap: {
  //           _id: getIntFromObject('roadmap', query),
  //         },
  //       },
  //       take: getIntFromObject('take', query),
  //       skip: getIntFromObject('skip', query),
  //       relations: {
  //         features: {
  //           assignments: true,
  //         },
  //       },
  //       order: {
  //         major: 'DESC',
  //         minor: 'DESC',
  //         codename: 'DESC',
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
  //   config.api + 'versions/:id',
  //   async ({ params }, res, next) =>
  //     await Model.findOne({
  //       where: {
  //         _id: Number(params.id),
  //       },
  //       relations: {
  //         features: {
  //           tags: true,
  //           requirements: true,
  //           assignments: {
  //             user: true,
  //           },
  //         },
  //       },
  //     })
  //       .then((result) => res.send(result))
  //       .catch((error) => next(error))
  // );

  // /**
  //  * Update existing.
  //  */
  // app.put(config.api + 'versions/:id', async ({ params, body }, res, next) => {
  //   try {
  //     const model = await Model.findOneBy({ _id: Number(params.id) });
  //     if (model) {
  //       if (typeof body.major !== undefined) model.major = body.major;
  //       if (typeof body.minor !== undefined) model.minor = body.minor;
  //       if (typeof body.codename !== undefined) model.codename = body.codename;
  //       if (typeof body.archived !== undefined) model.archived = body.archived;
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
  //   config.api + 'versions/:id',
  //   async ({ params }, res, next) =>
  //     await Model.delete({
  //       _id: Number(params.id),
  //     })
  //       .then(() => res.status(200).end())
  //       .catch((error) => next(error))
  // );
};
