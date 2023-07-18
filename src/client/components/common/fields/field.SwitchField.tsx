import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { Switch } from '../inputs/input.Switch';
import { Label } from '../Label';

interface ISwitchField extends IField {
  value: boolean | undefined;
  onChange?: (newValue: boolean) => void;
}

/**
 * Togglable switch field.
 */
export const SwitchField = ({
  endpoint,
  fieldKey,
  disabled,
  readonly,
  value,
  onChange,
}: ISwitchField) => {
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
  const handleChange = (newValue: boolean) => {
    if (onChange) {
      onChange(Boolean(newValue));
    } else {
      dispatch(
        modifyData({
          endpoint,
          fieldKey,
          value: Boolean(newValue),
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
      <Switch
        id={htmlFor}
        value={value}
        title={label}
        disabled={disabled}
        readonly={readonly}
        onChange={(e) => handleChange(e)}
      />
    </Label>
  );
};
