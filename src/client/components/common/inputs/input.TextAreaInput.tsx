import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IInput } from './input';

export const StyledTextAreaInput = styled.textarea`
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
  resize: none;
  &:focus {
    outline: ${({ theme }) => theme.outline.input};
    outline-offset: -2px;
  }
`;

interface ITextAreaInput extends IInput {
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}

/**
 * A large textual input.
 */
export const TextAreaInput = ({
  id,
  title,
  disabled,
  readonly,
  value,
  placeholder,
  onChange,
}: ITextAreaInput) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<string>(value);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <StyledTextAreaInput
      id={id}
      rows={4}
      value={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      title={title}
      maxLength={10240}
      aria-label={title}
      onChange={handleChange}
    />
  );
};
