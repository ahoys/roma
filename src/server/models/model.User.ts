import {
  Column,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Model } from './model';
import { Assignment } from './model.Assignment';
import { AssignmentComment } from './model.AssignmentComment';
import { RequirementComment } from './model.RequirementComment';
import { UserDTO } from '../../shared/dtos/dto.UserDTO';
import { defaultNameColumn } from './model';
import { defaultBooleanColumn } from './model';
import { defaultIntColumn } from './model';
import { defaultOauthColumn } from './model';
import { Roadmap } from './model.Roadmap';

@Entity()
export class User extends Model implements UserDTO {
  @Column(defaultOauthColumn)
  oauthId: string;

  @Column({ ...defaultNameColumn, unique: false })
  name: string;

  @Column(defaultBooleanColumn)
  admin: boolean;

  @Column(defaultIntColumn)
  hourPrice: number;

  @ManyToOne(() => Roadmap, (model) => model.defaultForUsers, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  defaultRoadmap: Roadmap | null;

  @OneToMany(() => Assignment, (model) => model.user)
  assignments: Assignment[];

  @OneToMany(() => AssignmentComment, (model) => model.user)
  assignmentComments: AssignmentComment[];

  @OneToMany(() => RequirementComment, (model) => model.user)
  requirementComments: RequirementComment[];

  @ManyToMany(() => Roadmap, { nullable: true })
  @JoinTable()
  roadmaps: Roadmap[];

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<UserDTO>): Promise<User> {
    const model = new User();
    return await User.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: User,
    partial: Partial<UserDTO>
  ): Promise<User> {
    if (typeof partial.name === 'string') {
      model.name = partial.name;
    }
    if (typeof partial.admin === 'boolean') {
      model.admin = partial.admin;
    }
    if (typeof partial.hourPrice === 'number') {
      model.hourPrice = partial.hourPrice;
    }
    if (typeof partial.defaultRoadmapId === 'number') {
      model.defaultRoadmap = (await Roadmap.findOneBy({
        _id: partial.defaultRoadmapId,
      })) as Roadmap;
    }
    if (Array.isArray(partial.roadmapIds)) {
      model.roadmaps = await Roadmap.findBy({
        _id: In(partial.roadmapIds),
      });
    }
    return await model.save();
  }
}
