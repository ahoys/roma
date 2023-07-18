import { IsBoolean, IsInt, IsOptional, Length } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { RoadmapDTO } from './dto.RoadmapDTO';
import { FeatureDTO } from './dto.FeatureDTO';

export class VersionDTO extends ModelDTO {
  @IsInt()
  major: number;

  @IsInt()
  minor: number;

  @Length(0, 255)
  @IsOptional()
  codename: string;

  @IsBoolean()
  @IsOptional()
  archived: boolean;

  @IsInt()
  roadmapId?: RoadmapDTO['_id'];
  roadmap?: RoadmapDTO;

  features?: FeatureDTO[];

  constructor(partial: Partial<VersionDTO> = {}) {
    super(partial);
    if (typeof partial.major === 'number') {
      this.major = partial.major;
    }
    if (typeof partial.minor === 'number') {
      this.minor = partial.minor;
    }
    if (typeof partial.codename === 'string') {
      this.codename = partial.codename;
    }
    if (typeof partial.archived === 'boolean') {
      this.archived = partial.archived;
    }
    if (typeof partial.roadmapId === 'number') {
      this.roadmapId = partial.roadmapId;
    }
    if (partial.roadmap) {
      this.roadmap = new RoadmapDTO(partial.roadmap);
    }
    if (Array.isArray(partial.features)) {
      this.features = partial.features.map(
        (feature) => new FeatureDTO(feature)
      );
    }
  }
}
