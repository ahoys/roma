import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { ComboBox, IComboBox } from '../inputs/input.ComboBox';
import { Label } from '../Label';

interface IComboBoxField extends IField {
  selected: IComboBox['selected'];
  options?: IComboBox['options'];
  placeholder?: IComboBox['placeholder'];
  canNull?: IComboBox['canNull'];
  onChange?: IComboBox['handleChange'];
}

/**
 * Singular selection field.
 */
export const ComboBoxField = ({
  endpoint,
  fieldKey,
  fieldKeyModified,
  selected,
  options = [],
  placeholder,
  canNull,
  disabled,
  readonly,
  onChange,
}: IComboBoxField) => {
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
      <ComboBox
        id={htmlFor}
        options={options}
        selected={selected}
        placeholder={placeholder ?? label}
        title={placeholder ?? label}
        canNull={canNull}
        disabled={disabled}
        readonly={readonly}
        handleChange={(e) => handleChange(e)}
      />
    </Label>
  );
};
