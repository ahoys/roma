import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons/faFolderClosed';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { TextInput } from './inputs/input.TextInput';
import { useStrings } from 'hooks/hook.useStrings';
import { ComboBox, IComboBox } from './inputs/input.ComboBox';

const StyledRouteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.small};
  min-width: 384px;
`;

const StyledFiltersAndSorters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRowAction = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  padding: 16px;
  gap: 16px;
  transition: background 0.25s, color 0.25s;
  &:hover {
    animation: flow 4s ease-in-out infinite;
    background: ${({ theme }) => theme.special.nero};
    background-size: 200%;
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

const StyledRow = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: ${({ theme }) => theme.gap.small};
  overflow: hidden;
`;

interface IStyledRowContent {
  isActive: boolean;
}

const StyledRowContent = styled.div<IStyledRowContent>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5rem;
  gap: ${({ theme }) => theme.gap.normal};
  opacity: ${({ isActive, theme }) =>
    isActive ? theme.color.navigatorButton : 'inherit'};
  z-index: 1;
  svg {
    min-width: 18px;
  }
`;

interface IStyledRowBg {
  isActive: boolean;
}

const StyledRowBg = styled.div<IStyledRowBg>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.background.navigatorButton};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.25s;
  z-index: 0;
`;

interface IRow {
  id: number;
  name: string;
  to: string;
}

interface IRouteList {
  baseUrl?: string;
  rows?: IRow[];
  dependency?: IComboBox;
  actions?: {
    id: string;
    name: string;
    icon: IconDefinition;
    disabled?: boolean;
    onClick: () => void;
  }[];
}

export const RouteList = ({
  baseUrl = '',
  rows,
  dependency,
  actions,
}: IRouteList) => {
  const str = useStrings();
  const { pathname } = useLocation();
  const [filter, setFilter] = useState('');
  const [doBounce, setDoBounce] = useState(false);
  const filteredRows = filter.trim()
    ? rows?.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()))
    : rows;
  useEffect(() => {
    if (
      dependency &&
      dependency.selected === undefined &&
      dependency.options &&
      dependency.options[0]
    ) {
      if (dependency.canNull) {
        dependency.handleChange(-1);
      } else {
        dependency.handleChange(dependency.options[0].id);
      }
    }
  }, [dependency]);
  return (
    <StyledRouteList>
      <StyledFiltersAndSorters>
        {dependency && <ComboBox {...dependency} />}
        <TextInput
          id={'RouteList:filter'}
          value={filter}
          placeholder={str.fields.filter}
          title={str.fields.filter}
          onChange={(v) => setFilter(v)}
        />
      </StyledFiltersAndSorters>
      <StyledListContainer>
        {actions?.map((r) => (
          <StyledRowAction
            key={r.id}
            type={'button'}
            title={r.name}
            disabled={r.disabled}
            onClick={
              r.disabled
                ? undefined
                : () => {
                    setDoBounce(false);
                    r.onClick();
                  }
            }
            onMouseEnter={() => setDoBounce(true)}
            onMouseLeave={() => setDoBounce(false)}
          >
            <span>{r.name}</span>
            <FontAwesomeIcon icon={r.icon} bounce={doBounce} />
          </StyledRowAction>
        ))}
        {filteredRows?.map((r) => {
          const isActive = pathname.endsWith(r.to);
          return (
            <StyledRow key={r.id} to={baseUrl + r.to} title={r.name}>
              <StyledRowContent isActive={isActive}>
                <FontAwesomeIcon
                  icon={isActive ? faFolderOpen : faFolderClosed}
                />
                <span>{r.name}</span>
              </StyledRowContent>
              <StyledRowBg isActive={isActive} />
            </StyledRow>
          );
        })}
      </StyledListContainer>
    </StyledRouteList>
  );
};
