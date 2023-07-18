import { Column, Entity, ManyToOne } from 'typeorm';
import { Model, defaultIntColumn, defaultNameColumn } from './model';
import { Roadmap } from './model.Roadmap';
import { TagDTO } from '../../shared/dtos/dto.TagDTO';

@Entity()
export class Tag extends Model implements TagDTO {
  @Column(defaultNameColumn)
  name: string;

  @Column(defaultIntColumn)
  weight: number;

  @ManyToOne(() => Roadmap, (model) => model.tags, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  roadmap: Roadmap;

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<TagDTO>): Promise<Tag> {
    const model = new Tag();
    return await Tag.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Tag,
    partial: Partial<TagDTO>
  ): Promise<Tag> {
    if (typeof partial.name === 'string') {
      model.name = partial.name;
    }
    if (typeof partial.weight === 'number') {
      model.weight = partial.weight;
    }
    if (partial.roadmapId) {
      model.roadmap = (await Roadmap.findOneBy({
        _id: partial.roadmapId,
      })) as Roadmap;
    }
    return await model.save();
  }
}
