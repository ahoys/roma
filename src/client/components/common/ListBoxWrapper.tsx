import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isChildOf } from 'utilities/utilities.fields';

interface IStyledListBoxWrapper {
  offset: number;
  openUp: boolean;
  maxWidth?: number;
  maxHeight: number;
}

const StyledListBoxWrapper = styled.div<IStyledListBoxWrapper>`
  position: absolute;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.openUp ? `bottom: ${props.offset}px;` : `top: ${props.offset}px;`}
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zindex.menus};
  background: ${({ theme }) => theme.background.menu};
  color: ${({ theme }) => theme.color.menu};
  border: 1px solid #000000;
  max-height: ${(props) => props.maxHeight}px;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : '')}
  min-width: 128px;
  overflow: hidden;
  overflow-y: auto;
`;

interface IListBoxWrapper {
  parentRef: React.RefObject<HTMLDivElement>;
  offset: number;
  openUp: boolean;
  maxWidth?: number;
  maxHeight: number;
  handleClose: () => void;
  children: JSX.Element | JSX.Element[];
}

export const ListBoxWrapper = ({
  parentRef,
  offset,
  openUp,
  maxWidth,
  maxHeight,
  handleClose,
  children,
}: IListBoxWrapper) => {
  /**
   * Trigger close if the user clicks outside the parent element.
   */
  useEffect(() => {
    const handleClickEvent = (event: Event) => {
      if (event?.target && !isChildOf(event.target, parentRef)) {
        handleClose();
      }
    };
    window.addEventListener('click', handleClickEvent);
    window.addEventListener('focusin', handleClickEvent);
    return () => {
      window.removeEventListener('click', handleClickEvent);
      window.removeEventListener('focusin', handleClickEvent);
    };
  }, []);
  return (
    children && (
      <StyledListBoxWrapper
        offset={offset}
        openUp={openUp}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        role={'listbox'}
      >
        {children}
      </StyledListBoxWrapper>
    )
  );
};
