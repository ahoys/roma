import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IInput } from './input';

const StyledSliderInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledSliderInputElement = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
`;

interface ISliderInput extends IInput {
  value?: number;
  min?: number;
  max?: number;
  minStr?: string;
  maxStr?: string;
  onChange: (v: number) => void;
}

export const SliderInput = ({
  id,
  value,
  min = -2,
  max = 2,
  minStr = '',
  maxStr = '',
  title,
  disabled,
  readonly,
  onChange,
}: ISliderInput) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<number>(value ?? 0);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(evt.currentTarget.value);
    setInputValue(newValue);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 192);
  };
  useEffect(() => {
    if (typeof value === 'number' && !timeoutRef.current) {
      setInputValue(value);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);
  return (
    <StyledSliderInput id={id}>
      <p>{minStr ?? min}</p>
      <StyledSliderInputElement
        type={'range'}
        value={inputValue}
        min={min}
        max={max}
        disabled={disabled ?? readonly}
        title={title}
        onChange={(evt) => handleChange(evt)}
      />
      <p>{maxStr ?? max}</p>
    </StyledSliderInput>
  );
};
