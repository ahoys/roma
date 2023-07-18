import React from 'react';
import { IDevPane } from 'reducers/reducer.pane';
import { Columns } from '../../common/Columns';

export const DevPane = ({ value }: IDevPane) => {
  return <Columns columnsCount={1}>{value}</Columns>;
};
