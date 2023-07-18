import React from 'react';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import styled from 'styled-components';

interface IStyledColumns {
  columnsCount: number;
}

const StyledColumns = styled.div<IStyledColumns>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 0 0 auto;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gap.large};
  & > * {
    & > * {
      // Prevents weird stuff with field heights.
      flex: 0;
    }
    // -2 is for the gap between fields.
    width: ${(props) =>
      props.columnsCount === 1
        ? 100
        : Math.floor(100 / props.columnsCount) - 3}%;
  }
`;

interface IColumns {
  columnsCount?: number;
  children: JSX.Element | JSX.Element[] | string | undefined;
}

export const Columns = ({ columnsCount = 2, children }: IColumns) => {
  const { screenFormat } = useAppSelector((state) => state.device);
  return (
    <StyledColumns columnsCount={screenFormat === 'mobile' ? 1 : columnsCount}>
      {children}
    </StyledColumns>
  );
};
