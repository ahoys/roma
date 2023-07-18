import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Model, defaultBooleanColumn, defaultStringValueColumn } from './model';
import { RequirementComment } from './model.RequirementComment';
import { Feature } from './model.Feature';
import { ModelDTO } from '../../shared/dtos/dto.ModelDTO';
import { RequirementDTO } from 'dtos/dto.RequirementDTO';

@Entity()
export class Requirement extends Model implements ModelDTO {
  @Column(defaultStringValueColumn)
  @Index({ fulltext: true })
  value: string;

  @Column(defaultBooleanColumn)
  fulfilled: boolean;

  @ManyToOne(() => Feature, (model) => model.requirements, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  feature: Feature;

  @OneToMany(() => RequirementComment, (model) => model.requirement)
  comments: RequirementComment[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(
    partial: Partial<RequirementDTO>
  ): Promise<Requirement> {
    const model = new Requirement();
    return await Requirement.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Requirement,
    partial: Partial<RequirementDTO>
  ): Promise<Requirement> {
    if (typeof partial.value === 'string') {
      model.value = partial.value;
    }
    if (typeof partial.fulfilled === 'boolean') {
      model.fulfilled = partial.fulfilled;
    }
    if (typeof partial.featureId === 'number') {
      model.feature = (await Feature.findOneBy({
        _id: partial.featureId,
      })) as Feature;
    }
    return await model.save();
  }
}
