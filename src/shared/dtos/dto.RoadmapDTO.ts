import { IsOptional, Length } from 'class-validator';
import { ModelDTO } from './dto.ModelDTO';
import { UserDTO } from './dto.UserDTO';
import { Exclude } from 'class-transformer';

export class RoadmapDTO extends ModelDTO {
  @Length(1, 255)
  name: string;

  @Length(1, 255)
  @Exclude({ toPlainOnly: true })
  @IsOptional()
  gitlabAccessToken?: string;

  defaultForUsers?: UserDTO[];

  constructor(partial: Partial<RoadmapDTO> = {}) {
    super(partial);
    if (typeof partial.name === 'string') {
      this.name = partial.name;
    }
    if (typeof partial.gitlabAccessToken === 'string') {
      this.gitlabAccessToken = partial.gitlabAccessToken;
    }
    if (Array.isArray(partial.defaultForUsers)) {
      this.defaultForUsers = partial.defaultForUsers.map(
        (user) => new UserDTO(user)
      );
    }
  }
}
