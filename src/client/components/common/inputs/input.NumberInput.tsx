import React, { useState, useEffect, useRef } from 'react';
import { StyledTextInput } from './input.TextInput';
import { IInput } from './input';

interface INumberInput extends IInput {
  value: number;
  placeholder: string;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

/**
 * Numerical input.
 */
export const NumberInput = ({
  id,
  title,
  disabled,
  readonly,
  value,
  placeholder,
  min,
  max,
  onChange,
}: INumberInput) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<number>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let newValue = Number(e.currentTarget.value);
    if (max !== undefined && newValue > max) {
      newValue = max;
    } else if (min !== undefined && newValue < min) {
      newValue = min;
    }
    if (!isNaN(newValue) && newValue !== inputValue) {
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
    if (typeof value === 'number') {
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
      type={'number'}
      value={inputValue.toString()}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      title={title}
      aria-label={title}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};
