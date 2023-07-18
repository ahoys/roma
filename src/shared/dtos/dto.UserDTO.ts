import { IsBoolean, IsInt, IsOptional, Length } from 'class-validator';
import { AssignmentDTO } from './dto.AssignmentDTO';
import { ModelDTO } from './dto.ModelDTO';
import { RoadmapDTO } from './dto.RoadmapDTO';

export class UserDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  @IsBoolean()
  @IsOptional()
  admin: boolean;

  @IsInt()
  @IsOptional()
  hourPrice: number;

  @IsInt()
  @IsOptional()
  defaultRoadmapId?: RoadmapDTO['_id'];
  defaultRoadmap?: RoadmapDTO | null;

  @IsInt({ each: true })
  @IsOptional()
  roadmapIds?: RoadmapDTO['_id'][];
  roadmaps?: RoadmapDTO[];

  assignments?: AssignmentDTO[];

  constructor(partial: Partial<UserDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (typeof partial.admin === 'boolean') {
      this.admin = partial.admin;
    }
    if (typeof partial.hourPrice === 'number') {
      this.hourPrice = partial.hourPrice;
    }
    if (typeof partial.defaultRoadmapId === 'number') {
      this.defaultRoadmapId = partial.defaultRoadmapId;
    }
    if (partial.defaultRoadmap) {
      this.defaultRoadmap = new RoadmapDTO(partial.defaultRoadmap);
    }
    if (Array.isArray(partial.roadmapIds)) {
      this.roadmapIds = partial.roadmapIds;
    }
    if (Array.isArray(partial.roadmaps)) {
      this.roadmaps = partial.roadmaps.map(
        (roadmap) => new RoadmapDTO(roadmap)
      );
    }
    if (Array.isArray(partial.assignments)) {
      this.assignments = partial.assignments.map(
        (assignment) => new AssignmentDTO(assignment)
      );
    }
  }
}
