import React from 'react';
import styled from 'styled-components';
import { SaveBar } from './SaveBar';

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gap.large};
`;

const StyledFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.large};
`;

interface IForm {
  endpoint: string;
  resource: string;
  hasExportToGitLab?: boolean;
  children: JSX.Element | JSX.Element[] | undefined;
}

export const Form = ({
  endpoint,
  resource,
  hasExportToGitLab,
  children,
}: IForm) => (
  <StyledForm>
    <SaveBar
      endpoint={endpoint}
      resource={resource}
      hasExportToGitLab={hasExportToGitLab}
    />
    <StyledFormContent>{children}</StyledFormContent>
  </StyledForm>
);
