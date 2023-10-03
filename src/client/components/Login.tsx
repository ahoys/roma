import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { useStrings } from 'hooks/hook.useStrings';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32vh;
  width: 80vw;
  max-width: 768px;
  p {
    margin: ${({ theme }) => theme.gap.large} 0;
  }
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.small};
`;

export const Login = () => {
  const str = useStrings();
  const oauthConfig =
    config.oauth.authBy === 'google'
      ? config.oauth.google
      : config.oauth.aad;
  return (
    <StyledLogin>
      <StyledLoginContainer>
        <h1>{str.login.h1}</h1>
        <h2>{str.login.h2}</h2>
        <p>{str.login.p}</p>
        <StyledActions>
          <a href={oauthConfig.apiAuthenticate}>{str.login.a_login}</a>
        </StyledActions>
      </StyledLoginContainer>
    </StyledLogin>
  );
};
