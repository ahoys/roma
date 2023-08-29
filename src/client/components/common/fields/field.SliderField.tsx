import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { SliderInput } from '../inputs/input.SliderInput';
import { Label } from '../Label';

interface ISliderField extends IField {
  value: number | undefined;
  min: number;
  max: number;
  minStr?: string;
  maxStr?: string;
  onChange?: (newValue: number) => void;
}

/**
 * A slider field.
 */
export const SliderField = ({
  endpoint,
  fieldKey,
  fieldKeyModified,
  disabled,
  readonly,
  value,
  min,
  max,
  minStr,
  maxStr,
  onChange,
}: ISliderField) => {
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
      fieldKey={fieldKeyModified ?? fieldKey}
      htmlFor={htmlFor}
      name={label}
      description={description}
    >
      <SliderInput
        id={htmlFor}
        value={value}
        min={min}
        max={max}
        minStr={minStr}
        maxStr={maxStr}
        title={label}
        disabled={disabled}
        readonly={readonly}
        onChange={(e) => handleChange(e)}
      />
    </Label>
  );
};
