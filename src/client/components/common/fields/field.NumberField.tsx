import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField, StyledInputWrapper } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { NumberInput } from '../inputs/input.NumberInput';
import { Label } from '../Label';

interface INumberField extends IField {
  value: number | undefined;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?: (newValue: number) => void;
}

/**
 * Numerical input field.
 */
export const NumberField = ({
  endpoint,
  fieldKey,
  disabled,
  readonly,
  value = 0,
  placeholder,
  min,
  max,
  onChange,
}: INumberField) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const label = str.fields[fieldKey];
  const description = str.descriptions[fieldKey];
  const htmlFor = `${endpoint}:${fieldKey}`;
  /**
   * Handles changes to the field.
   *
   * The new value is either given to a callback or
   * stored to endpoint[fieldKey].
   */
  const handleChange = (newValue: number) => {
    if (onChange) {
      onChange(Number(newValue));
    } else {
      dispatch(
        modifyData({
          endpoint,
          fieldKey,
          value: Number(newValue),
        })
      );
    }
  };
  return (
    <Label
      endpoint={endpoint}
      fieldKey={fieldKey}
      htmlFor={htmlFor}
      name={label}
      description={description}
    >
      <StyledInputWrapper>
        <NumberInput
          id={htmlFor}
          value={value}
          placeholder={placeholder ?? label}
          title={label}
          disabled={disabled}
          readonly={readonly}
          min={min}
          max={max}
          onChange={handleChange}
        />
      </StyledInputWrapper>
    </Label>
  );
};
