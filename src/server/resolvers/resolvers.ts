import config from '../server.config';
import { ClassConstructor } from 'class-transformer';
import { Application, Request } from 'express';
import { validator, getIntFromObject } from '../utilities/utilities.resolvers';
import { DataSource, FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from '../models/model.User';

interface ICreate<T> {
  endpoint: string;
  server: Application;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dto: ClassConstructor<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCreate: (partial: Partial<T>) => Promise<T | undefined>;
  options?: {
    readRequestUserToBody?: boolean;
  };
}

/**
 * Endpoint for creating a new entity.
 */
export const commonCreateResolver = <T>({
  endpoint,
  server,
  Dto,
  handleCreate,
  options,
}: ICreate<T>) =>
  server.post(config.api + endpoint, async (req, res, next) => {
    try {
      if (options?.readRequestUserToBody) {
        const user = await User.findOneBy({ _id: (req.user as User)?._id });
        req.body = { ...req.body, user };
      }
      const validationErrors = await validator(Dto, req.body);
      if (validationErrors.length === 0) {
        const created = await handleCreate(new Dto(req.body));
        if (created) {
          res.status(201).json(created);
        } else {
          res.status(500).end();
        }
      } else {
        next(validationErrors);
      }
    } catch (error) {
      next(error);
    }
  });

interface IReadMany<T> {
  endpoint: string;
  server: Application;
  ds: DataSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model: ClassConstructor<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dto: ClassConstructor<any>;
  findManyOptions: (req: Request) => FindManyOptions<T>;
}

/**
 * Endpoint for reading multiple entities.
 */
export const commonReadManyResolver = <T>({
  endpoint,
  server,
  ds,
  Model,
  Dto,
  findManyOptions,
}: IReadMany<T>) =>
  server.get(config.api + endpoint, async (req, res, next) => {
    try {
      const entities = await ds.getRepository(Model).find(findManyOptions(req));
      res.json(entities.map((entity) => new Dto(entity)));
    } catch (error) {
      next(error);
    }
  });

interface IRead<T> {
  endpoint: string;
  server: Application;
  ds: DataSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model: ClassConstructor<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dto: ClassConstructor<any>;
  findOneOptions: (req: Request) => FindOneOptions<T>;
}

/**
 * Endpoint for reading one entity.
 */
export const commonReadResolver = <T>({
  endpoint,
  server,
  ds,
  Model,
  Dto,
  findOneOptions,
}: IRead<T>) =>
  server.get(config.api + endpoint, async (req, res, next) => {
    try {
      const entity = await ds.getRepository(Model).findOne(findOneOptions(req));
      if (entity) {
        res.json(new Dto(entity));
      } else {
        const isVersionQuery =
          typeof getIntFromObject('_version', req.query) === 'number';
        res.status(isVersionQuery ? 304 : 404).end();
      }
    } catch (error) {
      next(error);
    }
  });

interface IUpdate<T, K> {
  endpoint: string;
  server: Application;
  ds: DataSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model: ClassConstructor<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dto: ClassConstructor<any>;
  options?: {
    stripUserFromBody?: boolean;
  };
  findOneOptions: (req: Request) => FindOneOptions<T>;
  handleUpdate?: (Model: T, dto: K) => Promise<T | undefined>;
}

/**
 * Endpoint for updating an entity.
 */
export const commonUpdateResolver = <T, K>({
  endpoint,
  server,
  ds,
  Model,
  Dto,
  options,
  findOneOptions,
  handleUpdate,
}: IUpdate<T, K>) => {
  server.put(config.api + endpoint, async (req, res, next) => {
    try {
      if (options?.stripUserFromBody) {
        delete req.body.user;
      }
      const validationErrors = await validator(Dto, req.body, true);
      if (validationErrors.length === 0) {
        const repository = ds.getRepository(Model);
        const entity = await repository.findOne(findOneOptions(req));
        if (entity) {
          if (handleUpdate) {
            await handleUpdate(entity, new Dto(req.body));
          } else {
            await repository.update(
              {
                where: {
                  _id: entity._id,
                },
              },
              new Dto(req.body)
            );
          }
          res.status(204).end();
        } else {
          res.status(404).end();
          return;
        }
      } else {
        next(validationErrors);
      }
    } catch (error) {
      next(error);
    }
  });
};

interface IDelete<T> {
  endpoint: string;
  server: Application;
  ds: DataSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model: ClassConstructor<any>;
  findOneOptions: (req: Request) => FindOneOptions<T>;
}

/**
 * Endpoint for deleting an entity.
 */
export const commonDeleteResolver = <T>({
  endpoint,
  server,
  ds,
  Model,
  findOneOptions,
}: IDelete<T>) => {
  server.delete(config.api + endpoint, async (req, res, next) => {
    try {
      const repository = ds.getRepository(Model);
      const entity = await repository.findOne(findOneOptions(req));
      if (entity) {
        await repository.delete({
          _id: entity._id,
        });
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  });
};
