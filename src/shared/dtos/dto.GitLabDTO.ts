import { IsInt } from 'class-validator';

export class GitLabFeatureDTO {
  @IsInt()
  featureId: number;

  constructor(partial: Partial<GitLabFeatureDTO> = {}) {
    if (typeof partial.featureId === 'number') {
      this.featureId = partial.featureId;
    }
  }
}
