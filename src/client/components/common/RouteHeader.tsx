import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/hook.useAppSelector';

const StyledRouteHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IRouteHeader {
  endpoint?: string;
  value?: string;
}

export const RouteHeader = ({ endpoint, value }: IRouteHeader) => {
  const original = useAppSelector((state) => state.data.original);
  const name = endpoint ? ((original[endpoint]?.name || '') as string) : '';
  return (
    <StyledRouteHeader>
      <h1>{value || name}</h1>
    </StyledRouteHeader>
  );
};
