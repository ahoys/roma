import React from 'react';
import styled from 'styled-components';

const StyledRouteContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 32px;
  gap: 32px;
`;

interface IRouteContainer {
  children:
    | JSX.Element
    | null
    | undefined
    | false
    | (JSX.Element | null | undefined | false)[];
}

export const RouteContainer = ({ children }: IRouteContainer) => (
  <StyledRouteContainer>{children}</StyledRouteContainer>
);
