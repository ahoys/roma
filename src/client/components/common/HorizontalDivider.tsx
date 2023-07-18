import React from 'react';
import styled from 'styled-components';

const StyledHorizontalDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.special.roma};
`;

export const HorizontalDivider = () => <StyledHorizontalDivider />;
