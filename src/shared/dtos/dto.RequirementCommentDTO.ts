import { IsInt, Length, ValidateNested } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { RequirementDTO } from './dto.RequirementDTO';
import { UserDTO } from './dto.UserDTO';
import { Type } from 'class-transformer';

export class RequirementCommentDTO extends ModelDTO {
  @Length(1, 10240)
  value: string;

  @IsInt()
  parentId?: RequirementDTO['_id'];
  requirement?: RequirementDTO;

  @ValidateNested()
  @Type(() => UserDTO)
  user?: UserDTO;

  constructor(partial: Partial<RequirementCommentDTO> = {}) {
    super(partial);
    if (typeof partial.value === 'string') {
      this.value = partial.value;
    }
    if (typeof partial.parentId === 'number') {
      this.parentId = partial.parentId;
    }
    if (partial.requirement) {
      this.requirement = new RequirementDTO(partial.requirement);
    }
    if (typeof partial.user === 'object') {
      this.user = new UserDTO(partial.user);
    }
  }
}
