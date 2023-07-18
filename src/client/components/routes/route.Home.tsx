import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { RouteContainer } from 'components/common/RouteContainer';
import { useList } from 'hooks/hook.useList';
import { useStrings } from 'hooks/hook.useStrings';
import { ActionsWrapper } from 'components/common/ActionsWrapper';
import { IconTextButton } from 'components/common/buttons/button.IconTextButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setModal } from 'reducers/reducer.modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setRoadmap } from 'reducers/reducer.data';
import { useNavigate } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';

const StyledNoRoadmap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledListOfRoadmaps = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledRoadmapRow = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.gap.normal};
`;

const StyledRowHeader = styled.button`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  cursor: default;
  &:hover {
    background: ${({ theme }) => theme.special.nero};
    background-size: 25%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StyledRowActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledRowAction = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.gap.large};
  height: ${({ theme }) => theme.gap.large};
`;

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const str = useStrings();
  const { data, isLoading } = useList<RoadmapDTO[]>('roadmaps');
  /**
   * Opens a modal for creating a new roadmap.
   */
  const handleCreateRoadmap = () =>
    dispatch(
      setModal({
        id: 'Home:new-roadmap',
        type: 'create-new',
        endpoint: 'roadmaps',
        title: str.titles.createRoadmap,
        created: new Date().getTime(),
      })
    );
  /**
   * Selects a roadmap and navigates to it.
   */
  const handleSelectRoadmap = (roadmap: RoadmapDTO) => {
    dispatch(setRoadmap(roadmap._id));
    navigate(config.publicPath + 'r/' + roadmap._id);
  };
  /**
   * Navigates to the edit page of a roadmap.
   */
  const handleEditRoadmap = (roadmap: RoadmapDTO) =>
    navigate(config.publicPath + 'roadmaps/' + roadmap._id);
  return (
    <RouteContainer>
      <h1>{str.home.title}</h1>
      {!isLoading && !data.length ? (
        <StyledNoRoadmap>
          <h2>{str.home.no_roadmaps}</h2>
          <ActionsWrapper>
            <IconTextButton
              name={str.home.create_first_roadmap}
              icon={faPlus}
              onClick={handleCreateRoadmap}
            />
          </ActionsWrapper>
        </StyledNoRoadmap>
      ) : null}
      {data.length > 0 && (
        <StyledListOfRoadmaps>
          <IconTextButton
            name={str.home.create_new_roadmap}
            icon={faPlus}
            hasBackground={false}
            onClick={handleCreateRoadmap}
          />
          {data.map((roadmap) => (
            <StyledRoadmapRow key={roadmap._id}>
              <StyledRowHeader onClick={() => handleSelectRoadmap(roadmap)}>
                <h3>{roadmap.name}</h3>
              </StyledRowHeader>
              <StyledRowActions>
                <StyledRowAction onClick={() => handleEditRoadmap(roadmap)}>
                  <FontAwesomeIcon icon={faEdit} />
                </StyledRowAction>
              </StyledRowActions>
            </StyledRoadmapRow>
          ))}
        </StyledListOfRoadmaps>
      )}
    </RouteContainer>
  );
};
