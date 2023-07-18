import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { CreateNewModal } from './types/modal.CreateNewModal';
import { CreateNewVersion } from './types/modal.CreateNewVersion';
import { CreateNewFeature } from './types/modal.CreateNewFeature';
import { RemoveModal } from './types/modal.RemoveModal';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { removeModal } from 'reducers/reducer.modals';

const StyledModals = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zindex.modals};
`;

const StyledHeader = styled.h1`
  font-size: 1.4rem;
  line-height: 1.9rem;
`;

const StyledContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const StyledModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  min-width: 256px;
  gap: ${({ theme }) => theme.gap.large};
  background: ${({ theme }) => theme.background.modal};
  color: ${({ theme }) => theme.color.modal};
  border-radius: ${({ theme }) => theme.gap.normal};
  padding: ${({ theme }) => theme.gap.large};
`;

export const StyledShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.special.roma};
  background-size: 300%;
  animation: flow 60s ease-in-out infinite;
  z-index: 0;
  opacity: 0.4;
  @keyframes flow {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export const Modals = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state) => state.modals.active);
  const elements: JSX.Element[] = [];
  for (const modal of modals) {
    if (modal.type === 'remove') {
      elements.push(
        <StyledModal key={modal.id}>
          <StyledHeader>{modal.title}</StyledHeader>
          <RemoveModal {...modal} />
        </StyledModal>
      );
    } else if (modal.type === 'create-new') {
      elements.push(
        <StyledModal key={modal.id}>
          <StyledHeader>{modal.title}</StyledHeader>
          <CreateNewModal {...modal} />
        </StyledModal>
      );
    } else if (modal.type === 'create-new-version') {
      elements.push(
        <StyledModal key={modal.id}>
          <StyledHeader>{modal.title}</StyledHeader>
          <CreateNewVersion {...modal} />
        </StyledModal>
      );
    } else if (modal.type === 'create-new-feature') {
      elements.push(
        <StyledModal key={modal.id}>
          <StyledHeader>{modal.title}</StyledHeader>
          <CreateNewFeature {...modal} />
        </StyledModal>
      );
    }
  }
  /**
   * Adds functionality where if user presses
   * the escape key, the uppermost modal will close.
   */
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      const modal = modals[modals.length - 1];
      if (modal && event.key?.toLowerCase() === 'escape') {
        dispatch(removeModal(modal.id));
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [modals]);
  return elements.length ? (
    <StyledModals>
      <StyledContent>{elements}</StyledContent>
      <StyledShadow />
    </StyledModals>
  ) : null;
};
