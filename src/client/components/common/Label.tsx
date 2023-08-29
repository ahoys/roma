import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIsModified } from 'hooks/hook.useIsModified';
import React from 'react';
import styled from 'styled-components';
import { Description } from './Description';

interface IStyledLabel {
  modified?: boolean;
}

const StyledLabel = styled.label<IStyledLabel>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gap.small};
  color: ${({ theme, modified }) =>
    modified ? theme.special.modified : 'inherit'};
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.small};
`;

interface IStyledIconsWrapper {
  modified: boolean;
}

const StyledIconsWrapper = styled.div<IStyledIconsWrapper>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5rem;
  gap: ${({ theme }) => theme.gap.small};
  opacity: ${({ modified }) => (modified ? '1' : '0.25')};
  color: ${({ theme, modified }) =>
    modified ? theme.special.modified : 'inherit'};
  transition: opacity 0.25s;
`;

interface ILabel {
  endpoint: string;
  fieldKey: string;
  htmlFor: string;
  name: string;
  description?: string;
  canBeModified?: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Label = ({
  endpoint,
  fieldKey,
  htmlFor,
  name,
  description = '',
  canBeModified = true,
  children,
}: ILabel) => {
  const modified = useIsModified(endpoint, fieldKey);
  console.log({ endpoint, fieldKey, modified });
  return (
    <StyledLabel htmlFor={htmlFor} aria-label={name}>
      <StyledHeaderWrapper>
        <StyledNameWrapper>
          {name}
          {canBeModified && (
            <StyledIconsWrapper modified={modified}>
              <FontAwesomeIcon icon={faAsterisk} />
            </StyledIconsWrapper>
          )}
        </StyledNameWrapper>
        <Description value={description} />
      </StyledHeaderWrapper>
      {children}
    </StyledLabel>
  );
};
