import React from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { removePane } from 'reducers/reducer.pane';

const StyledPaneTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h1 {
    flex: 1 1 auto;
  }
`;

const StyledClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  width: 4.2rem;
  height: 4.2rem;
`;

interface IPaneTitle {
  value: string;
}

export const PaneTitle = ({ value }: IPaneTitle) => {
  const dispatch = useAppDispatch();
  return (
    <StyledPaneTitle>
      <h1>{value}</h1>
      <StyledClose onClick={() => dispatch(removePane())}>
        <FontAwesomeIcon icon={faTimes} />
      </StyledClose>
    </StyledPaneTitle>
  );
};
