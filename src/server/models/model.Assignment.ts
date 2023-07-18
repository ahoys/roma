import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Model, defaultBooleanColumn, defaultIntColumn } from './model';
import { AssignmentComment } from './model.AssignmentComment';
import { Feature } from './model.Feature';
import { User } from './model.User';
import { AssignmentDTO } from '../../shared/dtos/dto.AssignmentDTO';

@Entity()
export class Assignment extends Model implements AssignmentDTO {
  @Column(defaultIntColumn)
  workHoursEstimate: number;

  @Column(defaultIntColumn)
  hourPrice: number;

  @Column(defaultBooleanColumn)
  done: boolean;

  @ManyToOne(() => Feature, (model) => model.assignments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  feature: Feature;

  @ManyToOne(() => User, (model) => model.assignments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => AssignmentComment, (model) => model.assignment)
  comments: AssignmentComment[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(
    partial: Partial<AssignmentDTO>
  ): Promise<Assignment> {
    const model = new Assignment();
    return await Assignment.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Assignment,
    partial: Partial<AssignmentDTO>
  ): Promise<Assignment> {
    if (typeof partial.workHoursEstimate === 'number') {
      model.workHoursEstimate = partial.workHoursEstimate;
    }
    if (typeof partial.hourPrice === 'number') {
      model.hourPrice = partial.hourPrice;
    }
    if (typeof partial.done === 'boolean') {
      model.done = partial.done;
    }
    if (typeof partial.featureId === 'number') {
      model.feature = (await Feature.findOneBy({
        _id: partial.featureId,
      })) as Feature;
    }
    if (typeof partial.userId === 'number') {
      model.user = (await User.findOneBy({
        _id: partial.userId,
      })) as User;
    }
    return await model.save();
  }
}
