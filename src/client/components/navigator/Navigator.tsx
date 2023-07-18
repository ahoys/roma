import React, { useState } from 'react';
import styled from 'styled-components';
import config from 'config';
import { NavigatorCategory } from './nav.NavigatorCategory';
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { useLocation } from 'react-router-dom';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setTheme } from 'reducers/reducer.device';
import { NavigatorHeader } from './nav.NavigatorHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IStyledNavigator {
  isMobile: boolean;
  isOpen: boolean;
}

const StyledNavigator = styled.div<IStyledNavigator>`
  position: ${({ isMobile }) => (isMobile ? 'absolute' : 'relative')};
  display: flex;
  flex-shrink: 0;
  width: ${({ isMobile, isOpen }) =>
    isMobile ? (isOpen ? '100%' : '64px') : '256px'};
  height: ${({ isMobile, isOpen }) =>
    isMobile ? (isOpen ? '100%' : '64px') : '100%'};
  z-index: ${({ theme }) => theme.zindex.navigator};
`;

interface IStyledNavigatorContent {
  isMobile: boolean;
  isOpen: boolean;
}

const StyledNavigatorContent = styled.nav<IStyledNavigatorContent>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  background: ${({ theme, isMobile }) =>
    isMobile ? theme.background.navigator : 'none'};
  color: ${({ theme, isMobile }) =>
    isMobile ? theme.color.navigator : 'inherit'};
  max-width: ${({ isMobile }) => (isMobile ? '80%' : '100%')};
  transition: background 0.25s, color 0.25s;
  overflow: hidden;
  overflow-y: auto;
  z-index: 2;
`;

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMenuButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
`;

const StyledCloseBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.special.nero};
  opacity: 0.4;
  z-index: 1;
`;

interface INavigator {
  isMobile: boolean;
}

export const Navigator = ({ isMobile }: INavigator) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const theme = useAppSelector((state) => state.device.theme);
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const doDisplayContent = isOpen || !isMobile;
  const isDisabled = !roadmap;
  let url = config.publicPath;
  if (roadmap) {
    url += 'r/' + roadmap;
  }
  return (
    <StyledNavigator isMobile={isMobile} isOpen={doDisplayContent}>
      {!doDisplayContent && (
        <StyledMenuButton onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </StyledMenuButton>
      )}
      {doDisplayContent && (
        <StyledNavigatorContent isMobile={isMobile} isOpen={doDisplayContent}>
          <StyledCategories>
            <NavigatorHeader />
            <NavigatorCategory
              header={str.navigator.follow}
              handleCloseNav={() => setIsOpen(false)}
              items={[
                {
                  id: 'follow:progress',
                  name: str.navigator.progress,
                  to: url,
                  icon: faMap,
                  disabled: isDisabled,
                  isActive: pathname === url,
                },
                {
                  id: 'follow:assignments',
                  name: str.navigator.assignments,
                  to: url + '/assignments',
                  icon: faPersonDigging,
                  disabled: isDisabled,
                  isActive: pathname.includes('/assignments'),
                },
              ]}
            />
            <NavigatorCategory
              header={str.navigator.build}
              handleCloseNav={() => setIsOpen(false)}
              items={[
                {
                  id: 'build:versions',
                  name: str.navigator.versions,
                  to: url + '/versions',
                  icon: faCubes,
                  disabled: isDisabled,
                  isActive: pathname.includes('/versions'),
                },
                {
                  id: 'build:features',
                  name: str.navigator.features,
                  to: url + '/features',
                  icon: faCube,
                  disabled: isDisabled,
                  isActive: pathname.includes('/features'),
                },
              ]}
            />
            <NavigatorCategory
              header={str.navigator.registers}
              handleCloseNav={() => setIsOpen(false)}
              items={[
                {
                  id: 'registers:products',
                  name: str.navigator.products,
                  to: url + '/products',
                  icon: faBoxesStacked,
                  disabled: isDisabled,
                  isActive: pathname.includes('/products'),
                },
                {
                  id: 'registers:tags',
                  name: str.navigator.tags,
                  to: url + '/tags',
                  icon: faTags,
                  disabled: isDisabled,
                  isActive: pathname.includes('/tags'),
                },
              ]}
            />
            {config.isDevelopment && (
              <NavigatorCategory
                header={str.navigator.dev}
                handleCloseNav={() => setIsOpen(false)}
                items={[
                  {
                    id: 'dev:products',
                    name: str.navigator.dev_tools,
                    to: config.publicPath + 'dev',
                    icon: faCode,
                    disabled: isDisabled,
                    isActive: pathname.includes('/dev'),
                  },
                ]}
              />
            )}
          </StyledCategories>
          <StyledCategories>
            <NavigatorCategory
              items={[
                {
                  id: 'actions:theme',
                  name:
                    theme === 'dark'
                      ? str.navigator.theme_light
                      : str.navigator.theme_dark,
                  to: '',
                  icon: theme === 'dark' ? faSun : faMoon,
                  disabled: false,
                  isActive: false,
                  onClick: () =>
                    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark')),
                },
              ]}
            />
          </StyledCategories>
        </StyledNavigatorContent>
      )}
      {isMobile && isOpen && <StyledCloseBg onClick={() => setIsOpen(false)} />}
    </StyledNavigator>
  );
};
