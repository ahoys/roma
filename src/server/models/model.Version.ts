import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import {
  Model,
  defaultBooleanColumn,
  defaultIntColumn,
  defaultNameColumn,
} from './model';
import { Feature } from './model.Feature';
import { Roadmap } from './model.Roadmap';
import { VersionDTO } from '../../shared/dtos/dto.VersionDTO';

@Entity()
@Unique(['major', 'minor'])
export class Version extends Model implements VersionDTO {
  @Column(defaultIntColumn)
  major: number;

  @Column(defaultIntColumn)
  minor: number;

  @Column(defaultNameColumn)
  codename: string;

  @Column(defaultBooleanColumn)
  archived: boolean;

  @ManyToOne(() => Roadmap, (model) => model.versions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  roadmap: Roadmap;

  @OneToMany(() => Feature, (model) => model.version)
  features: Feature[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<VersionDTO>): Promise<Version> {
    const model = new Version();
    return await Version.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Version,
    partial: Partial<VersionDTO>
  ): Promise<Version> {
    if (typeof partial.major === 'number') {
      model.major = partial.major;
    }
    if (typeof partial.minor === 'number') {
      model.minor = partial.minor;
    }
    if (typeof partial.codename === 'string') {
      model.codename = partial.codename;
    }
    if (typeof partial.archived === 'boolean') {
      model.archived = partial.archived;
    }
    if (partial.roadmapId) {
      model.roadmap = (await Roadmap.findOneBy({
        _id: partial.roadmapId,
      })) as Roadmap;
    }
    return await model.save();
  }
}
