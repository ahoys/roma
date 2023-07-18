import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { StyledShadow } from '../modals/Modals';
import { removePane } from 'reducers/reducer.pane';
import { PaneTitle } from './pane.title';
import { DevPane } from './types/pane.DevPane';
import { NewAssignmentPane } from './types/pane.NewAssignmentPane';
import { EditAssignmentPane } from './types/pane.EditAssignmentPane';
import { NewRequirementPane } from './types/pane.NewRequirementPane';
import { EditRequirementPane } from './types/pane.EditRequirementPane';

interface IStyledPane {
  isActive: boolean;
}

const StyledPane = styled.div<IStyledPane>`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  right: 0;
  width: ${({ isActive }) => (isActive ? '100%' : '0')};
  height: 100%;
  display: flex;
  z-index: ${({ theme }) => theme.zindex.pane};
`;

interface StyledContentWrapper {
  isFullScreen: boolean;
  isWide: boolean;
}

const StyledContentWrapper = styled.div<StyledContentWrapper>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 0;
  background: ${({ theme }) => theme.background.pane};
  color: ${({ theme }) => theme.color.pane};
  z-index: 1;
  animation: grow 0.25s ease-in-out;
  animation-fill-mode: forwards;
  overflow: hidden;
  overflow-y: auto;
  @keyframes grow {
    0% {
      width: 0%;
    }
    100% {
      width: ${({ isFullScreen, isWide }) =>
        isFullScreen ? '100vw' : isWide ? '60vw' : '80vw'};
    }
  }
`;

const StyledContentPadding = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.gap.large};
  gap: ${({ theme }) => theme.gap.large};
`;

const StyledElementWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.gap.large};
  flex: 1 1 auto;
  max-width: 768px;
  gap: ${({ theme }) => theme.gap.large};
  padding-bottom: ${({ theme }) => theme.gap.extra};
`;

export const Pane = () => {
  const dispatch = useAppDispatch();
  const pane = useAppSelector((state) => state.pane);
  const { title, forced, data } = pane;
  const { screenFormat } = useAppSelector((state) => state.device);
  const isFullScreen = screenFormat === 'mobile';
  const isWide = screenFormat === 'wide';
  let element: JSX.Element | undefined = undefined;
  if (data) {
    if (data.type === 'dev-pane') {
      element = <DevPane {...data} />;
    } else if (data.type === 'new-assignment-pane') {
      element = <NewAssignmentPane {...data} />;
    } else if (data.type === 'edit-assignment-pane') {
      element = <EditAssignmentPane {...data} />;
    } else if (data.type === 'new-requirement-pane') {
      element = <NewRequirementPane {...data} />;
    } else if (data.type === 'edit-requirement-pane') {
      element = <EditRequirementPane {...data} />;
    }
  }
  /**
   * Adds functionality where if user presses
   * the escape key, the pane will close.
   */
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (pane && event.key?.toLowerCase() === 'escape') {
        dispatch(removePane());
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [pane]);
  return (
    <StyledPane isActive={!!data}>
      {!!data && (
        <StyledContentWrapper isFullScreen={isFullScreen} isWide={isWide}>
          <StyledContentPadding>
            <PaneTitle value={title} />
            <StyledElementWrapper>{element}</StyledElementWrapper>
          </StyledContentPadding>
        </StyledContentWrapper>
      )}
      {!isFullScreen && !!data && (
        <StyledShadow
          onClick={forced ? undefined : () => dispatch(removePane())}
        />
      )}
    </StyledPane>
  );
};
