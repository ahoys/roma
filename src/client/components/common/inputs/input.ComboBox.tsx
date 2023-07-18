import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListBoxWrapper } from '../ListBoxWrapper';
import { TextInput } from './input.TextInput';
import { useStrings } from 'hooks/hook.useStrings';
import { IInput } from './input';

const StyledComboBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  background: ${({ theme }) => theme.background.input};
  color: ${({ theme }) => theme.color.input};
  border-radius: 4px;
`;

const StyledInputContainerButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 40px;
  border: 0;
  border-radius: 0;
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -2px;
  }
`;

const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 8px;
  cursor: default;
  min-height: 24px;
`;

const StyledOptionDescription = styled.div`
  font-size: 0.8rem;
  line-height: 1.3rem;
`;

export interface IComboBoxOption {
  id: number;
  name: string;
  description?: string;
}

export interface IComboBox extends IInput {
  selected: IComboBoxOption['id'] | null | undefined;
  options: IComboBoxOption[] | undefined;
  placeholder?: string;
  maxMenuHeightInPx?: number;
  canNull?: boolean;
  handleChange: (option: IComboBoxOption['id']) => void;
}

/**
 * ComboBox that can automatically open up or down, depending
 * on the available space.
 */
export const ComboBox = ({
  id,
  disabled,
  readonly,
  selected,
  options = [],
  title,
  placeholder,
  maxMenuHeightInPx = 384,
  canNull = false,
  handleChange,
}: IComboBox) => {
  const str = useStrings();
  const inputTimeout = useRef<NodeJS.Timeout>();
  const filterTimeout = useRef<NodeJS.Timeout>();
  const comboBoxRef: React.RefObject<HTMLDivElement> = useRef(null);
  const selectedOption = options.find((o) => o.id === selected);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOffset, setMenuOffset] = useState(0);
  const [doOpenMenuUp, setDoOpenMenuUp] = useState(false);
  const [maxMenuHeight, setMaxMenuHeight] = useState(0);
  const [filter, setFilter] = useState('');
  const getOptions = (value: IComboBox['options']) => {
    if (canNull && value) {
      const newValue = [...value];
      newValue.unshift({ id: -1, name: str.inputs.no_choice });
      return newValue;
    }
    return value || [];
  };
  const [filteredOptions, setFilteredOptions] = useState<IComboBoxOption[]>([]);
  /**
   * Returns the options, filtered.
   */
  const getFilteredOptions = (
    newFilter: string,
    options: IComboBox['options']
  ) => {
    if (newFilter.trim() === '') return options;
    if (newFilter === selectedOption?.name) return options;
    const searchString = newFilter.toLowerCase();
    return (
      options?.filter((o) => {
        const id = o.id.toString();
        const name = o.name.toLowerCase();
        const description = o.description?.toLowerCase() || '';
        return (
          id.includes(searchString) ||
          name.includes(searchString) ||
          description.includes(searchString)
        );
      }) || []
    );
  };
  /**
   * Opens the menu.
   */
  const handleOpen = () => {
    if (!disabled && !readonly && !isMenuOpen) {
      const parent = comboBoxRef?.current;
      if (parent) {
        // Height of the viewport.
        const vh = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        const rect = parent.getBoundingClientRect();
        // Decide whether to open up or down.
        const doOpenUp = vh - rect.bottom < maxMenuHeightInPx;
        // Calculate the available space. The -4 is just to have some gap.
        const space = doOpenUp ? rect.top - 4 : vh - rect.bottom - 4;
        setFilteredOptions(getOptions(getFilteredOptions(filter, options)));
        setDoOpenMenuUp(doOpenUp);
        setMenuOffset(parent.offsetHeight);
        setMaxMenuHeight(space > maxMenuHeightInPx ? maxMenuHeightInPx : space);
        setIsMenuOpen(true);
      }
    }
  };
  /**
   * Closes the menu.
   */
  const handleClose = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  /**
   * Sets a new value for the input and filters the options.
   * Keeps the component performant by staggering inputting and filtering.
   */
  const handleFilter = (newFilter: string) => {
    if (typeof newFilter === 'string' && newFilter !== filter) {
      clearTimeout(inputTimeout.current);
      inputTimeout.current = setTimeout(() => {
        setFilter(newFilter);
      }, 1);
      clearTimeout(filterTimeout.current);
      filterTimeout.current = setTimeout(
        () =>
          setFilteredOptions(
            getOptions(getFilteredOptions(newFilter, options))
          ),
        128
      );
    }
  };
  /**
   * Sets a new selected value and closes the menu.
   */
  const handleSelectValue = (id: IComboBoxOption['id']) => {
    if (id !== selected) {
      handleChange(id);
    }
    setIsMenuOpen(false);
  };
  /**
   * Clear timeouts.
   */
  useEffect(() => {
    return () => {
      clearTimeout(inputTimeout.current);
      clearTimeout(filterTimeout.current);
    };
  }, []);
  return (
    <StyledComboBox id={id} ref={comboBoxRef}>
      <StyledInputContainer onClick={handleOpen}>
        <TextInput
          id={`ComboBox:${id}:TextInput`}
          value={selectedOption?.name || ''}
          placeholder={placeholder || title}
          title={title}
          onChange={handleFilter}
        />
        <StyledInputContainerButton
          type={'button'}
          title={isMenuOpen ? 'Close' : 'Open'}
          onClick={isMenuOpen ? handleClose : handleOpen}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} />
        </StyledInputContainerButton>
      </StyledInputContainer>
      {isMenuOpen && (
        <ListBoxWrapper
          parentRef={comboBoxRef}
          offset={menuOffset}
          openUp={doOpenMenuUp}
          maxHeight={maxMenuHeight}
          handleClose={handleClose}
        >
          {...filteredOptions.map((fo) => (
            <StyledOption
              key={fo.id}
              aria-label={fo.name}
              onClick={() => handleSelectValue(fo.id)}
            >
              <div>{fo.name}</div>
              <StyledOptionDescription>
                {fo.description}
              </StyledOptionDescription>
            </StyledOption>
          ))}
        </ListBoxWrapper>
      )}
    </StyledComboBox>
  );
};
