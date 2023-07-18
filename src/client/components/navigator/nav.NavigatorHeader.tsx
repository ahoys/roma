import React from 'react';
import styled from 'styled-components';
import config from 'config';

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.gap.normal};
  margin-bottom: ${({ theme }) => theme.gap.large};
  h1 {
    font-size: 1.4rem;
    line-height: 1.9rem;
    font-weight: 600;
    cursor: default;
  }
`;

const StyledHeaderText = styled.h1`
  animation: flow 60s ease-in-out infinite;
  background: ${({ theme }) => theme.special.roma};
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  @keyframes flow {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export const NavigatorHeader = () => (
  <StyledHeaderContainer>
    <StyledHeaderText>{config.meta.title}</StyledHeaderText>
  </StyledHeaderContainer>
);
