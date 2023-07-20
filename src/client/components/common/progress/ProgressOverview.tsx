import React from 'react';
import styled from 'styled-components';
import { useStrings } from 'hooks/hook.useStrings';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { useList } from 'hooks/hook.useList';

const StyledProgressOverview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledRow = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const ProgressOverview = () => {
  const str = useStrings();
  // Fetching already happens in ProgressVersions.
  const versionsData = useList<VersionDTO[]>('versions?archived=false', false);
  const features = (
    (versionsData.data || [])
      .filter((v) => v.features)
      .map((v) => v.features) || []
  ).flat();
  /**
   * Returns total price of all assignments.
   */
  const getPriceTotal = (): string => {
    const assignments = (features?.map((f) => f?.assignments) || []).flat();
    const price = assignments.reduce(
      (value, b) => value + (b?.workHoursEstimate ?? 0) * (b?.hourPrice ?? 0),
      0
    );
    return `${str.progress.price}: ${price} €`;
  };
  /**
   * Returns total hours of all assignments.
   */
  const getHoursTotal = (): string => {
    const assignments = (features?.map((f) => f?.assignments) || []).flat();
    const hours = assignments.reduce(
      (value, b) => value + (b?.workHoursEstimate ?? 0),
      0
    );
    return `${str.progress.hours}: ${hours} h`;
  };
  /**
   * Returns a balance string.
   */
  const getBalance = (): string => {
    const balanceTotal =
      features?.reduce((a, b) => a + (b?.balance ?? 0), 0) || 0;
    const balanceAvg =
      Math.round((balanceTotal / (features?.length || 1)) * 100) / 100;
    return `${str.progress.avg_balance}: ${balanceAvg}`;
  };
  return (
    <StyledProgressOverview>
      <StyledList>
        <StyledRow>
          <p>{getBalance()}</p>
        </StyledRow>
        <StyledRow>
          <p>{getHoursTotal()}</p>
        </StyledRow>
        <StyledRow>
          <p>{getPriceTotal()}</p>
        </StyledRow>
      </StyledList>
    </StyledProgressOverview>
  );
};
