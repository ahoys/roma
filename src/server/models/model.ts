import { ModelDTO } from '../../shared/dtos/dto.ModelDTO';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  ColumnOptions,
} from 'typeorm';

export class Model extends BaseEntity implements ModelDTO {
  @PrimaryGeneratedColumn({ type: 'int' })
  _id: number;

  @VersionColumn({ type: 'int' })
  _version: number;

  // Type and precision is required for (older) MySQL.
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  _created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  _updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  _deleted_at: Date;
}

export const defaultNameColumn: ColumnOptions = {
  type: 'varchar',
  length: 255,
  nullable: false,
  unique: true,
};

export const defaultStringValueColumn: ColumnOptions = {
  type: 'text',
  default: '',
  nullable: false,
};

export const defaultIntColumn: ColumnOptions = {
  type: 'int',
  default: 0,
};

export const defaultBooleanColumn: ColumnOptions = {
  type: 'boolean',
  default: false,
};

export const defaultOauthColumn: ColumnOptions = {
  type: 'varchar',
  length: 255,
  nullable: false,
  unique: true,
};
