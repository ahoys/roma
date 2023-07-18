import React from 'react';
import { RouteContainer } from '../common/RouteContainer';
import { ProgressVersions } from 'components/common/progress/ProgressVersions';
import { ProgressOverview } from 'components/common/progress/ProgressOverview';
import { HorizontalDivider } from 'components/common/HorizontalDivider';

export const Progress = () => (
  <RouteContainer>
    <ProgressVersions />
    <HorizontalDivider />
    <ProgressOverview />
  </RouteContainer>
);
