import { IsInt, IsNumber, IsOptional, Length } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { RoadmapDTO } from './dto.RoadmapDTO';

export class ProductDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  @IsNumber()
  @IsOptional()
  gitlabId?: number; // For GitLab etc.

  @IsInt()
  roadmapId?: RoadmapDTO['_id'];
  roadmap?: RoadmapDTO;

  constructor(partial: Partial<ProductDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (typeof partial.gitlabId === 'number') {
      this.gitlabId = partial.gitlabId;
    }
    if (typeof partial.roadmapId === 'number') {
      this.roadmapId = partial.roadmapId;
    }
    if (partial.roadmap) {
      this.roadmap = new RoadmapDTO(partial.roadmap);
    }
  }
}
