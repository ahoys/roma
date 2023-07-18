import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { TextInput } from '../inputs/input.TextInput';
import { IField, StyledInputWrapper } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { Label } from '../Label';

interface ITextField extends IField {
  value: string | undefined;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}

/**
 * Textual input field.
 */
export const TextField = ({
  endpoint,
  fieldKey,
  disabled,
  readonly,
  value = '',
  placeholder,
  onChange,
}: ITextField) => {
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
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(String(newValue));
    } else {
      dispatch(
        modifyData({
          endpoint,
          fieldKey,
          value: String(newValue),
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
        <TextInput
          id={htmlFor}
          value={value}
          placeholder={placeholder ?? label}
          title={label}
          disabled={disabled}
          readonly={readonly}
          onChange={handleChange}
        />
      </StyledInputWrapper>
    </Label>
  );
};
