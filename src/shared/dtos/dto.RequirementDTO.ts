import { IsBoolean, IsInt, IsOptional, Length } from 'class-validator';
import { FeatureDTO } from './dto.FeatureDTO';
import { ModelDTO } from './dto.ModelDTO';
import { RequirementCommentDTO } from './dto.RequirementCommentDTO';

export class RequirementDTO extends ModelDTO {
  @Length(0, 10240)
  value: string;

  @IsBoolean()
  @IsOptional()
  fulfilled: boolean;

  @IsInt()
  featureId?: FeatureDTO['_id'];
  feature?: FeatureDTO;

  comments?: RequirementCommentDTO[];

  constructor(partial: Partial<RequirementDTO> = {}) {
    super(partial);
    if (typeof partial.value === 'string') {
      this.value = partial.value;
    }
    if (typeof partial.fulfilled === 'boolean') {
      this.fulfilled = partial.fulfilled;
    }
    if (typeof partial.featureId === 'number') {
      this.featureId = partial.featureId;
    }
    if (partial.feature) {
      this.feature = new FeatureDTO(partial.feature);
    }
    if (Array.isArray(partial.comments)) {
      this.comments = partial.comments.map(
        (comment) => new RequirementCommentDTO(comment)
      );
    }
  }
}
