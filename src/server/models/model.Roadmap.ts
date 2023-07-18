import { Column, Entity, OneToMany } from 'typeorm';
import { Model, defaultNameColumn } from './model';
import { Product } from './model.Product';
import { Tag } from './model.Tag';
import { Version } from './model.Version';
import { RoadmapDTO } from '../../shared/dtos/dto.RoadmapDTO';
import { User } from './model.User';

@Entity()
export class Roadmap extends Model implements RoadmapDTO {
  @Column(defaultNameColumn)
  name: string;

  @OneToMany(() => Version, (model) => model.roadmap)
  versions: Version[];

  @OneToMany(() => Product, (model) => model.roadmap)
  products: Product[];

  @OneToMany(() => Tag, (model) => model.roadmap)
  tags: Tag[];

  @OneToMany(() => User, (model) => model.defaultRoadmap)
  defaultForUsers: User[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<RoadmapDTO>): Promise<Roadmap> {
    const model = new Roadmap();
    return await Roadmap.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Roadmap,
    partial: Partial<RoadmapDTO>
  ): Promise<Roadmap> {
    if (typeof partial.name === 'string') {
      model.name = partial.name;
    }
    return await model.save();
  }
}
