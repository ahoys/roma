import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { Buttons } from '../inputs/input.Buttons';
import { IComboBoxOption } from '../inputs/input.ComboBox';
import { Label } from '../Label';

interface IButtonsField extends IField {
  selected: IComboBoxOption['id'][] | null | undefined;
  options?: IComboBoxOption[] | undefined;
  onChange?: (option: IComboBoxOption['id'][]) => void;
}

/**
 * Multi-select field.
 */
export const ButtonsField = ({
  endpoint,
  fieldKey,
  fieldKeyModified,
  selected,
  options = [],
  disabled,
  readonly,
  onChange,
}: IButtonsField) => {
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
  const handleChange = (newValue: IComboBoxOption['id'][]) => {
    if (onChange) {
      onChange(newValue);
    } else {
      dispatch(
        modifyData({
          endpoint,
          fieldKey,
          value: newValue,
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
      <Buttons
        id={htmlFor}
        selected={selected}
        options={options}
        title={label}
        disabled={disabled}
        readonly={readonly}
        handleChange={handleChange}
      />
    </Label>
  );
};
