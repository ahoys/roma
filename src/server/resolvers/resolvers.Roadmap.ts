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
};
