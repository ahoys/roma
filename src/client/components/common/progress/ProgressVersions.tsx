import React from 'react';
import styled from 'styled-components';
import { useData } from 'hooks/hook.useData';
import { ProgressVersionsRow } from './ProgressVersionsRow';
import { VersionDTO } from 'dtos/dto.VersionDTO';

const StyledProgressVersions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.large};
`;

export const ProgressVersions = () => {
  const versionsData = useData<VersionDTO[]>('versions?archived=false');
  return (
    <StyledProgressVersions>
      {versionsData.data?.map((v) => (
        <ProgressVersionsRow key={v._id} version={v} />
      ))}
    </StyledProgressVersions>
  );
};
