import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { useData } from 'hooks/hook.useData';
import { useStrings } from 'hooks/hook.useStrings';
import { ProgressTags } from './ProgressTags';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { useList } from 'hooks/hook.useList';

const StyledFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.gap.large};
`;

const StyledFeature = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledFeatureProgress = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  height: ${({ theme }) => theme.gap.small};
  background: ${({ theme }) => theme.background.bar};
`;

interface IStyledFeatureProgressBar {
  width: number;
}

const StyledFeatureProgressBar = styled.div<IStyledFeatureProgressBar>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 4px;
  width: ${({ width }) => width}%;
  background: ${({ theme, width }) =>
    width >= 100 ? theme.special.julius : theme.special.nero};
  transition: width 0.25s, background 0.25s;
`;

const StyledFeatureTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.normal};
`;

interface IProgressFeatures {
  version: VersionDTO;
}

export const ProgressFeatures = ({ version }: IProgressFeatures) => {
  const navigate = useNavigate();
  const str = useStrings();
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const { data } = useList<FeatureDTO[]>('features?version=' + version._id);
  const features = data || [];
  /**
   * Move to the edit page.
   */
  const handleEditFeature = (f: FeatureDTO) => {
    if (roadmap) {
      navigate(config.publicPath + 'r/' + roadmap + '/features/' + f._id);
    }
  };
  /**
   * Returns how much of the requirements have been fulfilled.
   */
  const getProgress = (f: FeatureDTO): number => {
    if (f.requirements?.length) {
      const requirementsLen = f.requirements.length;
      const requirementsFulfilledLen = f.requirements.filter(
        (r) => r.fulfilled
      ).length;
      return Math.ceil((requirementsFulfilledLen / requirementsLen) * 100);
    }
    return 100;
  };
  /**
   * Returns a textual description of the current state.
   */
  const getDescription = (f: FeatureDTO) => {
    const reqLen = f.requirements?.length;
    if (reqLen) {
      const fulfilledLen = f.requirements?.filter((r) => r.fulfilled).length;
      return (
        str.progress.requirements_done_0 +
        fulfilledLen +
        ' / ' +
        reqLen +
        str.progress.requirements_done_1
      );
    }
    return str.progress.no_requirements_set;
  };
  return (
    <StyledFeatures>
      {features?.map((f) => (
        <StyledFeature key={f._id} onClick={() => handleEditFeature(f)}>
          <h3>{f.name}</h3>
          <StyledFeatureTags>
            <p>{getDescription(f)}</p>
            {!!f.requirements?.length && <p>{`${getProgress(f)} %`}</p>}
          </StyledFeatureTags>
          {!!f.requirements?.length && (
            <StyledFeatureProgress>
              <StyledFeatureProgressBar width={getProgress(f)} />
            </StyledFeatureProgress>
          )}
          {!!f.tags?.length && <ProgressTags tags={f.tags} />}
        </StyledFeature>
      ))}
    </StyledFeatures>
  );
};
