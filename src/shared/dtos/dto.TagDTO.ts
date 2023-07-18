import { IsInt, IsOptional, Length } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { RoadmapDTO } from './dto.RoadmapDTO';

export class TagDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  @IsInt()
  @IsOptional()
  weight: number;

  @IsInt()
  roadmapId?: RoadmapDTO['_id'];
  roadmap?: RoadmapDTO;

  constructor(partial: Partial<TagDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (typeof partial.weight === 'number') {
      this.weight = partial.weight;
    }
    if (typeof partial.roadmapId === 'number') {
      this.roadmapId = partial.roadmapId;
    }
    if (partial.roadmap) {
      this.roadmap = new RoadmapDTO(partial.roadmap);
    }
  }
}
