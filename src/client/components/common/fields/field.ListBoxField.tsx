import React from 'react';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { modifyData } from 'reducers/reducer.data';
import { IField } from './field';
import { useStrings } from 'hooks/hook.useStrings';
import { IComboBoxOption } from '../inputs/input.ComboBox';
import { IListBox, ListBox } from '../inputs/input.ListBox';
import { Label } from '../Label';

interface IListBoxField extends IField {
  selected: IListBox['selected'];
  options?: IListBox['options'];
  placeholder?: IListBox['placeholder'];
  onChange?: IListBox['handleChange'];
}

/**
 * Multi-select field.
 */
export const ListBoxField = ({
  endpoint,
  fieldKey,
  fieldKeyModified,
  selected,
  options = [],
  placeholder,
  disabled,
  readonly,
  onChange,
}: IListBoxField) => {
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
      <ListBox
        id={htmlFor}
        options={options}
        selected={selected}
        placeholder={placeholder ?? label}
        title={placeholder ?? label}
        canNull={false}
        disabled={disabled}
        readonly={readonly}
        handleChange={handleChange}
      />
    </Label>
  );
};
