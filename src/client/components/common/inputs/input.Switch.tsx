import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStrings } from 'hooks/hook.useStrings';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IInput } from './input';

interface IStyledSwitch {
  inputValue: boolean;
}

const StyledSwitch = styled.button<IStyledSwitch>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  min-height: 44px;
  min-width: 44px;
  border: ${({ theme }) => theme.border.input};
  background: ${({ theme }) => theme.background.input};
  color: ${({ theme, inputValue }) =>
    inputValue ? theme.special.true : theme.special.false};
  border-radius: 4px;
  padding: 7px;
  transition: color 0.25s;
  font-size: 1rem;
  line-height: 1rem;
  &:focus {
    outline: ${({ theme }) => theme.outline.input};
    outline-offset: -2px;
  }
`;

interface ISwitch extends IInput {
  value?: boolean;
  onChange: (v: boolean) => void;
}

export const Switch = ({
  id,
  value,
  title,
  disabled,
  readonly,
  onChange,
}: ISwitch) => {
  const str = useStrings();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<boolean>(value ?? false);
  const handleChange = () => {
    const newValue = !inputValue;
    setInputValue(newValue);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 192);
  };
  useEffect(() => {
    if (typeof value === 'boolean' && !timeoutRef.current) {
      setInputValue(value);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);
  return (
    <StyledSwitch
      id={id}
      type={'button'}
      inputValue={inputValue}
      disabled={disabled ?? readonly}
      title={`${title}: ${inputValue ? str.buttons.on : str.buttons.off}`}
      onClick={handleChange}
    >
      <FontAwesomeIcon icon={inputValue ? faCheck : faTimes} />
    </StyledSwitch>
  );
};
