import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { AssignmentCommentDTO } from './dto.AssignmentCommentDTO';
import { FeatureDTO } from './dto.FeatureDTO';
import { ModelDTO } from './dto.ModelDTO';
import { UserDTO } from './dto.UserDTO';

export class AssignmentDTO extends ModelDTO {
  @IsInt()
  @IsOptional()
  workHoursEstimate: number;

  @IsInt()
  @IsOptional()
  hourPrice: number;

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @IsInt()
  featureId?: FeatureDTO['_id'];
  feature?: FeatureDTO;

  @IsInt()
  userId?: UserDTO['_id'];
  user?: UserDTO;

  comments?: AssignmentCommentDTO[];

  constructor(partial: Partial<AssignmentDTO> = {}) {
    super(partial);
    if (typeof partial.workHoursEstimate === 'number') {
      this.workHoursEstimate = partial.workHoursEstimate;
    }
    if (typeof partial.hourPrice === 'number') {
      this.hourPrice = partial.hourPrice;
    }
    if (typeof partial.done === 'boolean') {
      this.done = partial.done;
    }
    if (typeof partial.featureId === 'number') {
      this.featureId = partial.featureId;
    }
    if (partial.feature) {
      this.feature = new FeatureDTO(partial.feature);
    }
    if (typeof partial.userId === 'number') {
      this.userId = partial.userId;
    }
    if (partial.user) {
      this.user = new UserDTO(partial.user);
    }
    if (Array.isArray(partial.comments)) {
      this.comments = partial.comments.map(
        (comment) => new AssignmentCommentDTO(comment)
      );
    }
  }
}
