import React from 'react';
import styled from 'styled-components';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IButton } from './button';

interface IStyledIconTextButton {
  danger: boolean;
  hasBackground: boolean;
}

const StyledIconTextButton = styled.button<IStyledIconTextButton>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 8px 16px;
  margin: 0;
  background: ${({ theme, hasBackground }) =>
    hasBackground ? theme.background.button : 'none'};
  color: ${({ theme, hasBackground }) =>
    hasBackground ? theme.color.button : 'inherit'};
  border-radius: 8px;
  transition: background 0.25s, color 0.25s;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  transition: opacity 0.25s;
  &:hover {
    ${({ danger, theme }) =>
      danger ? `background: ${theme.background.danger};` : ''}
    ${({ danger, theme }) => (danger ? `color: ${theme.color.danger};` : '')}
  }
`;

const StyledIconWrapper = styled.div`
  width: 1rem;
`;

interface IIconTextButton extends IButton {
  icon: IconDefinition;
  hasBackground?: boolean;
}

/**
 * A textual button with an icon.
 */
export const IconTextButton = ({
  name,
  icon,
  title,
  type = 'button',
  disabled = false,
  danger = false,
  hasBackground = true,
  onClick,
}: IIconTextButton) => {
  const [doAnimate, setDoAnimate] = React.useState(false);
  return (
    <StyledIconTextButton
      type={type}
      title={title ?? name}
      aria-label={title ?? name}
      danger={danger}
      hasBackground={hasBackground}
      disabled={disabled}
      onClick={
        disabled
          ? undefined
          : () => {
              if (onClick) {
                onClick();
              }
              setDoAnimate(false);
            }
      }
      onMouseOver={() => setDoAnimate(true)}
      onMouseOut={() => setDoAnimate(false)}
    >
      {name}
      <StyledIconWrapper>
        <FontAwesomeIcon icon={icon} beatFade={!disabled && doAnimate} />
      </StyledIconWrapper>
    </StyledIconTextButton>
  );
};
