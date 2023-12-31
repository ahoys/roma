import styled from 'styled-components';

export interface IField {
  endpoint: string; // Into witch resource the data is stored.
  fieldKey: string; // Name of the field.
  fieldKeyModified?: string; // Special key for monitoring modified status.
  disabled?: boolean; // Disallows edits and reading.
  readonly?: boolean; // Disallows edits but allows reading.
}

export const StyledInputWrapper = styled.div`
  display: flex;
`;
