import {
  Column,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Model, defaultIntColumn, defaultNameColumn } from './model';
import { Assignment } from './model.Assignment';
import { Product } from './model.Product';
import { Requirement } from './model.Requirement';
import { Tag } from './model.Tag';
import { Version } from './model.Version';
import { FeatureDTO } from '../../shared/dtos/dto.FeatureDTO';

@Entity()
export class Feature extends Model implements FeatureDTO {
  @Column(defaultNameColumn)
  name: string;

  @Column(defaultIntColumn)
  balance: number;

  @Column({...defaultIntColumn, unique: true})
  gitlabId?: number; // For GitLab etc.

  @ManyToMany(() => Product, { nullable: true })
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Version, (model) => model.features, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  version: Version | null;

  @OneToMany(() => Requirement, (model) => model.feature)
  requirements: Requirement[];

  @OneToMany(() => Assignment, (model) => model.feature)
  assignments: Assignment[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<FeatureDTO>): Promise<Feature> {
    const model = new Feature();
    return await Feature.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Feature,
    partial: Partial<FeatureDTO>
  ): Promise<Feature> {
    if (typeof partial.name === 'string') {
      model.name = partial.name;
    }
    if (typeof partial.balance === 'number') {
      model.balance = partial.balance;
    }
    if (typeof partial.gitlabId === 'number') {
      model.gitlabId = partial.gitlabId;
    }
    if (Array.isArray(partial.productIds)) {
      model.products = await Product.findBy({
        _id: In(partial.productIds),
      });
    }
    if (Array.isArray(partial.tagIds)) {
      model.tags = await Tag.findBy({
        _id: In(partial.tagIds),
      });
    }
    if (typeof partial.versionId === 'number') {
      model.version = (await Version.findOneBy({
        _id: partial.versionId,
      })) as Version;
    }
    return await model.save();
  }
}
