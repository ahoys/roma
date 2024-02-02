import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IInput } from './input';

interface IStyledTextInput {
  readOnly?: boolean;
  disabled?: boolean;
}

export const StyledTextInput = styled.input<IStyledTextInput>`
  display: flex;
  flex: 1 1 auto;
  font-size: 1rem;
  line-height: 1.5rem;
  border: 0;
  padding: 8px;
  background: ${({ theme }) => theme.background.input};
  color: ${({ theme }) => theme.color.input};
  border: ${({ theme }) => theme.border.input};
  border-radius: 4px;
  opacity: ${({ readOnly, disabled }) =>
    readOnly || disabled ? (disabled ? '0.2' : '0.6') : '1.0'};
  &:focus {
    outline: ${({ theme }) => theme.outline.input};
    outline-offset: -2px;
  }
`;

interface ITextInput extends IInput {
  value: string;
  placeholder: string;
  type?: 'text' | 'password';
  onChange: (newValue: string) => void;
}

/**
 * Textual input.
 */
export const TextInput = ({
  id,
  title,
  disabled,
  readonly,
  value,
  placeholder,
  type,
  onChange,
}: ITextInput) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<string>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = String(e.currentTarget.value);
    if (newValue !== inputValue) {
      setInputValue(newValue);
      // Buffer storing to keep the performance
      // level high.
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, 192);
    }
  };
  /**
   * As we receive new value from the parent,
   * the input needs to be updated and the
   * buffering aborted.
   */
  useEffect(() => {
    if (typeof value === 'string') {
      setInputValue(value);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);
  return (
    <StyledTextInput
      id={id}
      type={type}
      value={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      title={title}
      aria-label={title}
      onChange={handleChange}
    />
  );
};
