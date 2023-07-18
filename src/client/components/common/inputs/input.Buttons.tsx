import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IComboBoxOption } from './input.ComboBox';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { IInput } from './input';

const StyledButtons = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.small};
  margin: 0;
  padding: 0;
`;

interface IStyledSelection {
  isSelected: boolean;
}

const StyledSelection = styled.li<IStyledSelection>`
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
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  transition: opacity 0.5s;
  svg {
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.special.true : 'inherit'};
  }
`;

export interface IButtons extends IInput {
  selected: IComboBoxOption['id'][] | null | undefined;
  options: IComboBoxOption[] | undefined;
  handleChange: (option: IComboBoxOption['id'][]) => void;
}

/**
 * A tile-wall of buttons that can be toggled on and off.
 */
export const Buttons = ({
  id,
  disabled,
  readonly,
  selected,
  options = [],
  handleChange,
}: IButtons) => {
  /**
   * Add or remove selection.
   */
  const handleClick = (id: IComboBoxOption['id']) => {
    const clicked = options.find((o) => o.id === id);
    if (clicked) {
      const isAlreadySelected = selected?.find((oId) => oId === id);
      if (isAlreadySelected && selected) {
        // Remove selection.
        const newSelected = selected.filter((oId) => oId !== id);
        handleChange(newSelected);
      } else {
        // Add selection.
        const newSelected = [...(selected || [])];
        newSelected.push(id);
        handleChange(newSelected);
      }
    }
  };
  return (
    <StyledButtons id={id}>
      {options.map((so) => (
        <StyledSelection
          key={so.id}
          isSelected={!!selected && selected.includes(so.id)}
          onClick={disabled || readonly ? undefined : () => handleClick(so.id)}
        >
          <FontAwesomeIcon
            icon={
              selected && selected.includes(so.id) ? faCheckSquare : faSquare
            }
          />
          <span>{so.name}</span>
        </StyledSelection>
      ))}
    </StyledButtons>
  );
};
