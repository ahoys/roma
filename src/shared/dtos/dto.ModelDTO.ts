export class ModelDTO {
  _id: number;

  _version: number;

  _created_at: Date;

  _updated_at: Date;

  _deleted_at: Date;

  constructor(partial: Partial<ModelDTO> = {}) {
    if (typeof partial._id === 'number') {
      this._id = partial._id;
    }
    if (typeof partial._version === 'number') {
      this._version = partial._version;
    }
    if (partial._created_at instanceof Date) {
      this._created_at = partial._created_at;
    }
    if (partial._updated_at instanceof Date) {
      this._updated_at = partial._updated_at;
    }
    if (partial._deleted_at instanceof Date) {
      this._deleted_at = partial._deleted_at;
    }
  }
}
