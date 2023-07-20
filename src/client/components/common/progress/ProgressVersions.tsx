import React from 'react';
import styled from 'styled-components';
import { ProgressVersionsRow } from './ProgressVersionsRow';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { useList } from 'hooks/hook.useList';

const StyledProgressVersions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.large};
`;

export const ProgressVersions = () => {
  const versionsData = useList<VersionDTO[]>('versions?archived=false');
  return (
    <StyledProgressVersions>
      {versionsData.data?.map((v) => (
        <ProgressVersionsRow key={v._id} version={v} />
      ))}
    </StyledProgressVersions>
  );
};
