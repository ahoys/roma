import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { Route, Routes } from 'react-router-dom';
import { Products } from '../routes/route.Products';
import { Tags } from '../routes/route.Tags';
import { Product } from '../routes/route.Product';
import { Tag } from '../routes/route.Tag';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { Features } from '../routes/route.Features';
import { Feature } from '../routes/route.Feature';
import { Versions } from '../routes/route.Versions';
import { Version } from '../routes/route.Version';
import { Progress } from '../routes/route.Progress';
import { Assignments } from '../routes/route.Assignments';
import { Assignment } from '../routes/route.Assignment';
import { Dev } from '../routes/route.Dev';
import { Home } from 'components/routes/route.Home';
import { Roadmap } from 'components/routes/route.Roadmap';
import { Profile } from 'components/routes/route.Profile';

interface IStyledContent {
  isMobile: boolean;
}

const StyledContent = styled.main<IStyledContent>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1 auto;
  overflow: hidden;
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 1 auto;
  overflow: hidden;
  overflow-y: auto;
`;

export const Content = () => {
  const screenFormat = useAppSelector((state) => state.device.screenFormat);
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const isDualMode = screenFormat === 'wide';
  const isMobile = screenFormat === 'mobile';
  let url = config.publicPath;
  if (!roadmap) {
    return (
      <StyledContent isMobile={isMobile}>
        <StyledRightContainer>
          <Routes>
            <Route path={url + 'roadmaps/:id'} element={<Roadmap />} />
            <Route path={'*'} element={<Home />} />
            <Route path={config.publicPath + 'profile'} element={<Profile />} />
          </Routes>
        </StyledRightContainer>
      </StyledContent>
    );
  } else {
    url += 'r/' + roadmap + '/';
  }
  return (
    <StyledContent isMobile={isMobile}>
      {isDualMode ? (
        <>
          <StyledLeftContainer>
            <Routes>
              <Route path={url + 'assignments/*'} element={<Assignments />} />
              <Route path={url + 'products/*'} element={<Products />} />
              <Route path={url + 'tags/*'} element={<Tags />} />
              <Route path={url + 'features/*'} element={<Features />} />
              <Route path={url + 'versions/*'} element={<Versions />} />
            </Routes>
          </StyledLeftContainer>
          <StyledRightContainer>
            <Routes>
              <Route path={url + 'assignments/:id'} element={<Assignment />} />
              <Route path={url + 'products/:id'} element={<Product />} />
              <Route path={url + 'tags/:id'} element={<Tag />} />
              <Route path={url + 'features/:id'} element={<Feature />} />
              <Route path={url + 'versions/:id'} element={<Version />} />
              <Route
                path={config.publicPath + 'profile'}
                element={<Profile />}
              />
              {config.isDevelopment && (
                <Route path={config.publicPath + 'dev'} element={<Dev />} />
              )}
              <Route path={url} element={<Progress />} />
            </Routes>
          </StyledRightContainer>
        </>
      ) : (
        <StyledRightContainer>
          <Routes>
            <Route path={url + 'assignments/:id'} element={<Assignment />} />
            <Route path={url + 'assignments'} element={<Assignments />} />
            <Route path={url + 'products/:id'} element={<Product />} />
            <Route path={url + 'products'} element={<Products />} />
            <Route path={url + 'tags/:id'} element={<Tag />} />
            <Route path={url + 'tags'} element={<Tags />} />
            <Route path={url + 'features'} element={<Features />} />
            <Route path={url + 'features/:id'} element={<Feature />} />
            <Route path={url + 'versions'} element={<Versions />} />
            <Route path={url + 'versions/:id'} element={<Version />} />
            <Route path={config.publicPath + 'profile'} element={<Profile />} />
            {config.isDevelopment && (
              <Route path={config.publicPath + 'dev'} element={<Dev />} />
            )}
            <Route path={url} element={<Progress />} />
          </Routes>
        </StyledRightContainer>
      )}
    </StyledContent>
  );
};
