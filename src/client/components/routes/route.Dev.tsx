import React from 'react';
import styled from 'styled-components';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { IconTextButton } from '../common/buttons/button.IconTextButton';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { setPane } from 'reducers/reducer.pane';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

export const Dev = () => {
  const dispatch = useAppDispatch();
  return (
    <RouteContainer>
      <RouteHeader value={'Development tools'} />
      <StyledButtons>
        <IconTextButton
          icon={faAsterisk}
          name={'Open a pane'}
          onClick={() =>
            dispatch(
              setPane({
                title: 'Title Example',
                forced: false,
                data: {
                  type: 'dev-pane',
                  value: 'Hello World!',
                },
              })
            )
          }
        />
      </StyledButtons>
    </RouteContainer>
  );
};
