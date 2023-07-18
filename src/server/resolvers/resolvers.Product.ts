import { Application } from 'express';
import { Product } from '../models/model.Product';
import { DataSource } from 'typeorm';
import {
  commonCreateResolver,
  commonDeleteResolver,
  commonReadManyResolver,
  commonReadResolver,
  commonUpdateResolver,
} from './resolvers';
import { ProductDTO } from 'dtos/dto.ProductDTO';
import { getIntFromObject } from '../utilities/utilities.resolvers';

export const productResolvers = (server: Application, ds: DataSource) => {
  const endpoint = 'products';

  /**
   * Insert new.
   */
  commonCreateResolver<Product>({
    endpoint,
    server,
    Dto: ProductDTO,
    handleCreate: Product.handleCreate,
  });

  /**
   * Read many.
   */
  commonReadManyResolver<Product>({
    endpoint,
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    findManyOptions: (req) => {
      const roadmapId = getIntFromObject('roadmap', req.query);
      if (typeof roadmapId === 'number') {
        return {
          where: {
            roadmap: {
              _id: roadmapId,
            },
          },
        };
      }
      return {};
    },
  });

  /**
   * Read one.
   */
  commonReadResolver<Product>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Update one.
   */
  commonUpdateResolver<Product, ProductDTO>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    Dto: ProductDTO,
    handleUpdate: Product.handleUpdate,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  /**
   * Delete one.
   */
  commonDeleteResolver<Product>({
    endpoint: endpoint + '/:_id',
    server,
    ds,
    Model: Product,
    findOneOptions: (req) => ({
      where: {
        _id: getIntFromObject('_id', req.params),
      },
    }),
  });

  // /**
  //  * Insert new.
  //  */
  // app.post(config.api + 'products', async ({ body }, res, next) => {
  //   try {
  //     const model = new Model();
  //     if (typeof body.name !== undefined) model.name = body.name;
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
  //   config.api + 'products',
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
  //   config.api + 'products/:id',
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
  // app.put(config.api + 'products/:id', async ({ params, body }, res, next) => {
  //   try {
  //     const model = await Model.findOneBy({ _id: Number(params.id) });
  //     if (model) {
  //       if (typeof body.name === 'string') model.name = body.name;
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
  //   config.api + 'products/:id',
  //   async ({ params }, res, next) =>
  //     await Model.delete({
  //       _id: Number(params.id),
  //     })
  //       .then(() => res.status(200).end())
  //       .catch((error) => next(error))
  // );
};
