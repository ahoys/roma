import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { TextInput } from '../inputs/input.TextInput';
import { IField, StyledInputWrapper } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { Label } from '../Label';

interface ITextField extends IField {
  value: string | undefined;
  type?: 'text' | 'password';
  placeholder?: string;
  onChange?: (newValue: string) => void;
}

/**
 * Textual input field.
 */
export const TextField = ({
  endpoint,
  fieldKey,
  fieldKeyModified,
  disabled,
  readonly,
  value = '',
  type = 'text',
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
      fieldKey={fieldKeyModified ?? fieldKey}
      htmlFor={htmlFor}
      name={label}
      description={description}
    >
      <StyledInputWrapper>
        <TextInput
          id={htmlFor}
          value={value}
          type={type}
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
