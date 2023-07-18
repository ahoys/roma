import React from 'react';
import styled from 'styled-components';

const StyledBreadcrumbs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  height: 64px;
`;

export const Breadcrumbs = () => {
  return <StyledBreadcrumbs>Breadcrumbs</StyledBreadcrumbs>;
};
