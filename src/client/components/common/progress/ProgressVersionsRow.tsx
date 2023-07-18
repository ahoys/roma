import React from 'react';
import styled from 'styled-components';
import { LargeTag } from '../LargeTag';
import { useStrings } from 'hooks/hook.useStrings';
import { ProgressFeatures } from './ProgressFeatures';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';

const StyledProgressVersionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.large};
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  cursor: default;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledLWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const StyledRWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  cursor: default;
  gap: ${({ theme }) => theme.gap.normal};
  p {
    font-style: italic;
  }
`;

const StyledVersion = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCodename = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IProgressVersionRow {
  version: VersionDTO;
}

export const ProgressVersionsRow = ({ version }: IProgressVersionRow) => {
  const str = useStrings();
  const { major, minor, features, codename } = version;
  /**
   * Returns total price of all assignments.
   */
  const getPriceTotal = (): string => {
    const assignments = (features?.map((f) => f.assignments) || []).flat();
    const price = assignments.reduce(
      (value, b) => value + (b?.workHoursEstimate ?? 0) * (b?.hourPrice ?? 0),
      0
    );
    return `${price} €`;
  };
  /**
   * Returns total hours of all assignments.
   */
  const getHoursTotal = (f?: FeatureDTO): string => {
    const assignments = f
      ? f.assignments || []
      : (features?.map((f) => f.assignments) || []).flat();
    const hours = assignments.reduce(
      (value, b) => value + (b?.workHoursEstimate ?? 0),
      0
    );
    return `${hours} h`;
  };
  /**
   * Returns a balance string.
   */
  const getBalance = (): string => {
    const balanceTotal = features?.reduce((a, b) => a + b.balance, 0) || 0;
    const balanceAvg = Math.round(balanceTotal / (features?.length || 1));
    const strMap: { [key: string]: string } = {
      '-2': str.progress.balance_neg2,
      '-1': str.progress.balance_neg1,
      '0': str.progress.balance_n,
      '1': str.progress.balance_pos1,
      '2': str.progress.balance_pos2,
    };
    return strMap[balanceAvg];
  };
  return (
    <StyledProgressVersionsRow>
      <StyledHeader>
        <StyledLWrapper>
          <StyledVersion>
            <h1>{`${major}.${minor}`}</h1>
          </StyledVersion>
          <StyledCodename>
            <h2>"{codename}"</h2>
          </StyledCodename>
        </StyledLWrapper>
        <StyledRWrapper>
          <LargeTag
            value={getPriceTotal()}
            title={str.titles.total_feature_price}
          />
          <LargeTag
            value={getHoursTotal()}
            title={str.titles.total_feature_hours}
          />
        </StyledRWrapper>
      </StyledHeader>
      <StyledDetails>
        <p title={str.progress.balance}>{getBalance()}</p>
      </StyledDetails>
      <ProgressFeatures version={version} />
    </StyledProgressVersionsRow>
  );
};
