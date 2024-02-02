import { IsInt, IsOptional, Length, Max, Min } from 'class-validator';
import { AssignmentDTO } from './dto.AssignmentDTO';
import { ModelDTO } from './dto.ModelDTO';
import { ProductDTO } from './dto.ProductDTO';
import { RequirementDTO } from './dto.RequirementDTO';
import { TagDTO } from './dto.TagDTO';
import { VersionDTO } from './dto.VersionDTO';

export class FeatureDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  @IsInt()
  @Min(-2)
  @Max(2)
  @IsOptional()
  balance: number;

  @IsInt({ each: true })
  @IsOptional()
  productIds?: ProductDTO['_id'][];
  products?: ProductDTO[];

  @IsInt({ each: true })
  @IsOptional()
  tagIds?: TagDTO['_id'][];
  tags?: TagDTO[];

  @IsInt()
  versionId?: VersionDTO['_id'];
  version?: VersionDTO | null;

  requirements?: RequirementDTO[];

  assignments?: AssignmentDTO[];

  constructor(partial: Partial<FeatureDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (typeof partial.balance === 'number') {
      this.balance = partial.balance;
    }
    if (Array.isArray(partial.productIds)) {
      this.productIds = partial.productIds;
    }
    if (Array.isArray(partial.products)) {
      this.products = partial.products.map(
        (product) => new ProductDTO(product)
      );
    }
    if (Array.isArray(partial.tagIds)) {
      this.tagIds = partial.tagIds;
    }
    if (Array.isArray(partial.tags)) {
      this.tags = partial.tags.map((tag) => new TagDTO(tag));
    }
    if (typeof partial.versionId === 'number') {
      this.versionId = partial.versionId;
    }
    if (partial.version) {
      this.version = new VersionDTO(partial.version);
    }
    if (Array.isArray(partial.requirements)) {
      this.requirements = partial.requirements.map(
        (requirement) => new RequirementDTO(requirement)
      );
    }
    if (Array.isArray(partial.assignments)) {
      this.assignments = partial.assignments.map(
        (assignment) => new AssignmentDTO(assignment)
      );
    }
  }
}
