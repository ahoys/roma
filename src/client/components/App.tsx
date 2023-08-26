import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import config from 'config';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { IDeviceState, setScreenFormat } from 'reducers/reducer.device';
import { isMobileDevice } from 'utilities/utilities.device';
import { useIsomorphicLayoutEffect } from 'hooks/hook.useIsomorphicLayoutEffect';
import { Navigator } from './navigator/Navigator';
import { Toolbar } from './toolbar/Toolbar';
import { Modals } from './modals/Modals';
import { Notifications } from './notifications/Notifications';
import { Content } from './content/Content';
import { themes } from '../theme';
import { Pane } from './pane/Pane';
import { useRoadmapSync } from 'hooks/hook.useRoadmapSync';
import { verify } from 'reducers/reducer.session';
import { Login } from './Login';
import { useNavigate } from 'react-router-dom';

const StyledApp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  background: ${({ theme }) => theme.background.app};
  color: ${({ theme }) => theme.color.app};
  transition: background 0.25s, color 0.25s;
`;

const StyledWidthWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-width: 2048px;
`;

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  background: ${({ theme }) => theme.special.roma};
  background-size: 100%;
`;

const StyledColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
`;

export const App = () => {
  useRoadmapSync();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.session);
  const { screenFormat, theme } = useAppSelector((state) => state.device);
  const isMobile = screenFormat === 'mobile';
  /**
   * Handles resizing of a window.
   * On resize (or on first load), it is decided whether
   * the device needs a new screen format to be set.
   *
   * For example if a mobile device is detected, the screen format
   * should be suitable for mobile devices.
   *
   * Run this every time the viewport is re-sized and on app load.
   */
  const handleResize = () => {
    const innerWidth = window.innerWidth;
    let newScreenFormat: IDeviceState['screenFormat'] = 'wide';
    if (isMobileDevice()) {
      newScreenFormat = 'mobile';
    } else {
      newScreenFormat =
        innerWidth < 1536 ? (innerWidth < 1024 ? 'mobile' : 'compact') : 'wide';
    }
    if (screenFormat !== newScreenFormat) {
      dispatch(setScreenFormat(newScreenFormat));
    }
  };
  useEffect(() => {
    dispatch(verify());
  }, []);
  useEffect(() => {
    const pathname = localStorage.getItem('pathname');
    if (isLoggedIn && pathname) {
      localStorage.removeItem('pathname');
      navigate(pathname);
    }
  }, [isLoggedIn]);
  useIsomorphicLayoutEffect(() => {
    if (config.isBrowser && window) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenFormat]);
  return (
    <ThemeProvider theme={themes[theme]}>
      <StyledApp>
        <StyledBackground />
        <Modals />
        <Pane />
        <StyledWidthWrapper>
          <Notifications />
          {isLoggedIn && <Navigator isMobile={isMobile} />}
          <StyledColumnWrapper>
            {isLoggedIn && (
              <>
                <Toolbar />
                <Content />
              </>
            )}
            {!isLoggedIn && <Login />}
          </StyledColumnWrapper>
        </StyledWidthWrapper>
      </StyledApp>
    </ThemeProvider>
  );
};
