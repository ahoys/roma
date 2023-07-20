import React from 'react';
import styled from 'styled-components';

interface IStyledActionsWrapper {
  hasGap: IActionsWrapper['hasGap'];
  hasBorder: IActionsWrapper['hasBorder'];
  justifyContent: IActionsWrapper['justifyContent'];
}

const StyledActionsWrapper = styled.div<IStyledActionsWrapper>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ hasBorder }) => (hasBorder ? '2px' : '0')};
  border: ${({ theme, hasBorder }) =>
    hasBorder ? theme.border.actions : 'none'};
  border-radius: ${({ theme, hasBorder }) =>
    hasBorder ? theme.gap.small : '0'};
  gap: ${({ theme, hasGap }) => (hasGap ? theme.gap.normal : '0')};
`;

interface IActionsWrapper {
  children: JSX.Element | JSX.Element[] | undefined;
  hasGap?: boolean;
  hasBorder?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
}

export const ActionsWrapper = ({
  children,
  hasGap = false,
  hasBorder = true,
  justifyContent = 'flex-start',
}: IActionsWrapper) => (
  <StyledActionsWrapper
    hasGap={hasGap}
    hasBorder={hasBorder}
    justifyContent={justifyContent}
  >
    {children}
  </StyledActionsWrapper>
);
