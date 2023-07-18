import { Length } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { UserDTO } from './dto.UserDTO';

export class RoadmapDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  defaultForUsers?: UserDTO[];

  constructor(partial: Partial<RoadmapDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (Array.isArray(partial.defaultForUsers)) {
      this.defaultForUsers = partial.defaultForUsers.map(
        (user) => new UserDTO(user)
      );
    }
  }
}
