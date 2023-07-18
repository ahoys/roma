import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  ITextNotification,
  removeNotification,
} from 'reducers/reducer.notifications';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TIMEOUT_MAX = 10240;
const TIMEOUT_MIN = 3840;

const StyledTextNotification = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

const StyledValue = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const TextNotification = ({ id, icon, value }: ITextNotification) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(removeNotification(id));
  };
  useEffect(() => {
    const timeoutInMs = value.length * 256;
    const timeout = setTimeout(
      () => {
        handleClose();
      },
      timeoutInMs < TIMEOUT_MIN
        ? TIMEOUT_MIN
        : timeoutInMs > TIMEOUT_MAX
        ? TIMEOUT_MAX
        : timeoutInMs
    );
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <StyledTextNotification id={`TextNotification:${id}`} onClick={handleClose}>
      <StyledIcon>
        <FontAwesomeIcon icon={icon} />
      </StyledIcon>
      <StyledValue>{value}</StyledValue>
    </StyledTextNotification>
  );
};
