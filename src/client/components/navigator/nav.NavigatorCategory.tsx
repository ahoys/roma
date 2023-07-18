import React from 'react';
import styled from 'styled-components';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const StyledNavigatorCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.gap.normal} 0;
  padding: 0;
`;

interface IStyledListItem {
  disabled: boolean;
  isActive: boolean;
}

const StyledListItem = styled.li<IStyledListItem>`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  line-height: 1.8rem;
  border-radius: ${({ theme }) => theme.gap.small};
  background: ${({ theme, isActive }) =>
    isActive ? theme.background.navigatorButton : 'none'};
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.navigatorButton : 'inherit'};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  a {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 auto;
  padding: ${({ theme }) => theme.gap.normal};
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledAction = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 auto;
  border: 0;
  gap: ${({ theme }) => theme.gap.normal};
`;

interface IItem {
  id: string;
  name: string;
  to: string;
  icon: IconDefinition;
  disabled: boolean;
  isActive: boolean;
  onClick?: () => void;
}

interface INavigatorCategory {
  items: IItem[];
  header?: string;
  handleCloseNav?: () => void;
}

export const NavigatorCategory = ({
  header,
  items,
  handleCloseNav,
}: INavigatorCategory) => {
  return (
    <StyledNavigatorCategory>
      <StyledHeader>
        <h3>{header}</h3>
      </StyledHeader>
      <StyledList>
        {items.map((it) => (
          <StyledListItem
            key={it.id}
            disabled={it.disabled}
            isActive={it.isActive}
            onClick={handleCloseNav}
          >
            {it.onClick ? (
              <StyledAction
                type={'button'}
                onClick={it.disabled ? undefined : it.onClick}
              >
                <span>{it.name}</span>
                <FontAwesomeIcon icon={it.icon} />
              </StyledAction>
            ) : (
              <StyledLink to={it.disabled ? '' : it.to}>
                <FontAwesomeIcon icon={it.icon} />
                <span>{it.name}</span>
              </StyledLink>
            )}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNavigatorCategory>
  );
};
