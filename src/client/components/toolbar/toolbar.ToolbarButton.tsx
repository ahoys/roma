import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledToolbarButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  color: inherit;
  border: 0;
  margin: 0;
  height: 100%;
  padding: 0 ${({ theme }) => theme.gap.normal};
  gap: ${({ theme }) => theme.gap.normal};
  &:hover {
    animation: flow 4s ease-in-out infinite;
    background: ${({ theme }) => theme.special.nero};
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
  }
`;

interface IToolbarButton {
  name: string;
  icon: IconDefinition;
  onClick: () => void;
}

/**
 * A simple button for toolbar.
 */
export const ToolbarButton = ({ name, icon, onClick }: IToolbarButton) => (
  <StyledToolbarButton onClick={onClick}>
    {name}
    <FontAwesomeIcon icon={icon} />
  </StyledToolbarButton>
);
