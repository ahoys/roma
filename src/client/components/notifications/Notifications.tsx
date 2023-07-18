import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { TextNotification } from './types/notification.TextNotification';

const StyledNotifications = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  z-index: ${({ theme }) => theme.zindex.notifications};
`;

const StyledNotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.background.notification};
  color: ${({ theme }) => theme.color.notification};
  animation: shake 0.2s;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

export const Notifications = () => {
  const notifications = useAppSelector((state) => state.notifications.active);
  const elements: JSX.Element[] = [];
  for (const notification of notifications) {
    if (notification.type === 'text') {
      elements.push(
        <StyledNotificationWrapper
          key={`${notification.id}-${notification.created}`}
        >
          <TextNotification {...notification} />
        </StyledNotificationWrapper>
      );
    }
  }
  return <StyledNotifications>{elements}</StyledNotifications>;
};
