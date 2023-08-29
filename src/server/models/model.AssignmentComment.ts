import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Model, defaultStringValueColumn } from './model';
import { User } from './model.User';
import { AssignmentCommentDTO } from '../../shared/dtos/dto.AssignmentCommentDTO';
import { Assignment } from './model.Assignment';

@Entity()
export class AssignmentComment extends Model implements AssignmentCommentDTO {
  @Column(defaultStringValueColumn)
  @Index({ fulltext: true })
  value: string;

  @ManyToOne(() => Assignment, (model) => model.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  assignment: Assignment;

  @ManyToOne(() => User, (model) => model.assignmentComments, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(
    partial: Partial<AssignmentCommentDTO>
  ): Promise<AssignmentComment> {
    const model = new AssignmentComment();
    return await AssignmentComment.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: AssignmentComment,
    partial: Partial<AssignmentCommentDTO>
  ): Promise<AssignmentComment> {
    if (typeof partial.value === 'string') {
      model.value = partial.value;
    }
    if (typeof partial.parentId === 'number') {
      model.assignment = (await Assignment.findOneBy({
        _id: partial.parentId,
      })) as Assignment;
    }
    if (typeof partial.user === 'object') {
      model.user = (await User.findOneBy({
        _id: partial.user._id,
      })) as User;
    }
    return await model.save();
  }
}
