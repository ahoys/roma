export interface IInput {
  id: string; // Identifier for the field, used for labels.
  title: string; // Used for accessibility.
  disabled?: boolean; // Disallows edits and reading.
  readonly?: boolean; // Disallows edits but allows reading.
}
