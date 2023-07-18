import React, { useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComboBox, IComboBoxOption } from './input.ComboBox';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { IInput } from './input';

const StyledListBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledComboWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelectionsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.small};
  margin: 0;
  padding: 0;
`;

const StyledSelection = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.background.button};
  color: ${({ theme }) => theme.color.button};
  border-radius: 4px;
  padding: 8px 16px;
  gap: ${({ theme }) => theme.gap.small};
  font-size: 1rem;
  line-height: 1.5rem;
`;

export interface IListBox extends IInput {
  selected: IComboBoxOption['id'][] | null | undefined;
  options: IComboBoxOption[] | undefined;
  placeholder?: string;
  canNull?: boolean;
  handleChange: (option: IComboBoxOption['id'][]) => void;
}

/**
 * ListBox that can automatically open up or down, depending
 * on the available space.
 */
export const ListBox = ({
  id,
  disabled,
  readonly,
  selected,
  options = [],
  title,
  placeholder,
  canNull = false,
  handleChange,
}: IListBox) => {
  const listBoxRef: React.RefObject<HTMLDivElement> = useRef(null);
  const filteredOptions = options.filter((opt) => !selected?.includes(opt.id));
  const selectedOptions = options.filter((opt) => selected?.includes(opt.id));
  /**
   * Sets a new selected value and closes the menu.
   */
  const handleSelect = (id: number) => {
    if (selected?.includes(id)) {
      // Remove the selection.
      const index = selected.findIndex((s) => s === id);
      if (index !== -1) {
        const newSelected = [...selected];
        newSelected.splice(index, 1);
        handleChange(newSelected);
      }
    } else {
      // Add a new selection.
      handleChange([...(selected || []), id]);
    }
  };
  return (
    <StyledListBox id={id} ref={listBoxRef}>
      <StyledComboWrapper>
        <ComboBox
          id={`${id}:ComboBox`}
          selected={undefined}
          options={filteredOptions}
          canNull={canNull}
          title={title}
          placeholder={placeholder}
          readonly={readonly}
          disabled={disabled}
          handleChange={handleSelect}
        />
      </StyledComboWrapper>
      <StyledSelectionsWrapper>
        {selectedOptions.map((so) => (
          <StyledSelection key={so.id} onClick={() => handleSelect(so.id)}>
            <span>{so.name}</span>
            <FontAwesomeIcon icon={faTimes} />
          </StyledSelection>
        ))}
      </StyledSelectionsWrapper>
    </StyledListBox>
  );
};
