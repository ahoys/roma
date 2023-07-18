import { useAppSelector } from 'hooks/hook.useAppSelector';
import React from 'react';
import styled from 'styled-components';

const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: default;
  margin-top: ${({ theme }) => theme.gap.normal};
  gap: ${({ theme }) => theme.gap.small};
`;

interface IStyledBigTag {
  isMobile: boolean;
}

const StyledBigTag = styled.div<IStyledBigTag>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 64px;
  font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1.5rem')};
  line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '2.25rem')};
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.gap.normal};
  padding: ${({ theme, isMobile }) =>
    isMobile ? theme.gap.small : theme.gap.normal};
  border: ${({ theme }) => theme.border.actions};
`;

interface ILargeTag {
  value: string;
  title?: string;
}

export const LargeTag = ({ value, title }: ILargeTag) => {
  const screenFormat = useAppSelector((state) => state.device.screenFormat);
  const isMobile = screenFormat === 'mobile';
  return (
    <StyledTags title={title}>
      <StyledBigTag isMobile={isMobile}>{value}</StyledBigTag>
    </StyledTags>
  );
};
