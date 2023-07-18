import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import config from 'config';
import axios from 'axios';
import { ToolbarButton } from './toolbar.ToolbarButton';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setRoadmap } from 'reducers/reducer.data';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { useStrings } from 'hooks/hook.useStrings';
import { useWhoAmI } from 'hooks/hook.useWhoAmI';

const StyledToolbar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 64px;
  gap: 16px;
`;

const StyledFunctionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 auto;
  height: 100%;
  margin-right: ${({ theme }) => theme.gap.normal};
`;

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const str = useStrings();
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const [name, setName] = useState(str.buttons.selectRoadmap);
  const whoAmI = useWhoAmI();
  const handleSwitchRoadmap = () => {
    dispatch(setRoadmap(undefined));
    navigate(config.publicPath);
  };
  const handleEditProfile = () => navigate(config.publicPath + 'profile');
  useEffect(() => {
    if (roadmap) {
      axios.get(config.api + 'roadmaps/' + roadmap).then(({ data }) => {
        if (typeof data?.name === 'string') {
          setName(data.name);
        }
      });
    }
  }, [roadmap]);
  return (
    <StyledToolbar>
      <StyledFunctionsContainer>
        <ToolbarButton
          name={name}
          icon={faEdit}
          onClick={handleSwitchRoadmap}
        />
        <ToolbarButton
          name={whoAmI?.user?.name.split(' ')[0] || '...'}
          icon={faUser}
          onClick={handleEditProfile}
        />
      </StyledFunctionsContainer>
    </StyledToolbar>
  );
};
