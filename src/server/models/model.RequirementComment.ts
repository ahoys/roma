import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Model, defaultStringValueColumn } from './model';
import { Requirement } from './model.Requirement';
import { User } from './model.User';
import { RequirementCommentDTO } from '../../shared/dtos/dto.RequirementCommentDTO';

@Entity()
export class RequirementComment extends Model implements RequirementCommentDTO {
  @Column(defaultStringValueColumn)
  @Index({ fulltext: true })
  value: string;

  @ManyToOne(() => Requirement, (model) => model.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  requirement: Requirement;

  @ManyToOne(() => User, (model) => model.requirementComments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(
    partial: Partial<RequirementCommentDTO>
  ): Promise<RequirementComment> {
    const model = new RequirementComment();
    return await RequirementComment.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: RequirementComment,
    partial: Partial<RequirementCommentDTO>
  ): Promise<RequirementComment> {
    if (typeof partial.value === 'string') {
      model.value = partial.value;
    }
    if (typeof partial.parentId === 'number') {
      model.requirement = (await Requirement.findOneBy({
        _id: partial.parentId,
      })) as Requirement;
    }
    if (typeof partial.user === 'object') {
      model.user = (await User.findOneBy({
        _id: partial.user._id,
      })) as User;
    }
    return await model.save();
  }
}
