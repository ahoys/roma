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
};
