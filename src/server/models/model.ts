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
  @PrimaryGeneratedColumn()
  _id: number;

  @VersionColumn()
  _version: number;

  // Type and precision is required for (older) MySQL.
  @CreateDateColumn()
  _created_at: Date;

  @UpdateDateColumn()
  _updated_at: Date;

  @DeleteDateColumn()
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
