import React from 'react';

interface IDescription {
  value: string;
}

export const Description = ({ value }: IDescription) =>
  value?.trim() !== '' ? (
    <p>
      <i>{value}</i>
    </p>
  ) : null;
