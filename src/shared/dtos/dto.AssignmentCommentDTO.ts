import { IsInt, Length, ValidateNested } from 'class-validator';
import { AssignmentDTO } from './dto.AssignmentDTO';
import { ModelDTO } from './dto.ModelDTO';
import { UserDTO } from './dto.UserDTO';

export class AssignmentCommentDTO extends ModelDTO {
  @Length(1, 10240)
  value: string;

  @IsInt()
  parentId?: AssignmentDTO['_id'];
  assignment?: AssignmentDTO;

  @ValidateNested()
  user?: UserDTO;

  constructor(partial: Partial<AssignmentCommentDTO> = {}) {
    super(partial);
    if (typeof partial.value === 'string') {
      this.value = partial.value;
    }
    if (typeof partial.parentId === 'number') {
      this.parentId = partial.parentId;
    }
    if (partial.assignment) {
      this.assignment = new AssignmentDTO(partial.assignment);
    }
    if (typeof partial.user === 'object') {
      this.user = new UserDTO(partial.user);
    }
  }
}
