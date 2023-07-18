import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { useWhoAmI } from 'hooks/hook.useWhoAmI';
import { useStrings } from 'hooks/hook.useStrings';
import { NumberField } from 'components/common/fields/field.NumberField';
import { Columns } from 'components/common/Columns';
import { ActionsWrapper } from 'components/common/ActionsWrapper';
import { IconTextButton } from 'components/common/buttons/button.IconTextButton';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useData } from 'hooks/hook.useData';
import { getData, modifyData, saveData } from 'reducers/reducer.data';
import { setNotification } from 'reducers/reducer.notifications';
import { UserDTO } from 'dtos/dto.UserDTO';
import { ComboBoxField } from 'components/common/fields/field.ComboBox';
import { useList } from 'hooks/hook.useList';
import { RoadmapDTO } from 'dtos/dto.RoadmapDTO';
import { ListBoxField } from 'components/common/fields/field.ListBoxField';
import { HorizontalDivider } from 'components/common/HorizontalDivider';
import { useIsModified } from 'hooks/hook.useIsModified';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.gap.normal} 0;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledListButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  width: ${({ theme }) => theme.gap.large};
  height: ${({ theme }) => theme.gap.large};
  &:disabled {
    opacity: 0.25;
  }
`;

export const Profile = () => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const {
    user,
    authenticatedUsers,
    unauthenticatedUsers,
    handleRemoveUser,
    handleAuthenticateUser,
    handleUnauthenticateUser,
  } = useWhoAmI();
  const endpoint = 'users/' + user?._id;
  const { data } = useData<UserDTO>(endpoint, !!user);
  const isModified = useIsModified(endpoint);
  const roadmaps = useList<RoadmapDTO[]>('roadmaps');
  const availableRoadmapsForDefault = [
    ...new Set(data?.roadmapIds || data?.roadmaps?.map((r) => r._id) || []),
  ];
  /**
   * Automatically set the default roadmap.
   */
  useEffect(() => {
    if (
      data?.defaultRoadmap === undefined &&
      data?.defaultRoadmapId === undefined &&
      data?.roadmapIds?.length
    ) {
      const defaultRoadmapId = data.roadmapIds[0];
      dispatch(
        modifyData({
          endpoint,
          fieldKey: 'defaultRoadmapId',
          value: defaultRoadmapId,
        })
      );
    }
  }, [data]);
  /**
   * If the default roadmap is removed from list of roadmaps,
   * set the first available roadmap as default.
   */
  useEffect(() => {
    const defaultId =
      typeof data?.defaultRoadmapId === 'number'
        ? data.defaultRoadmapId
        : data?.defaultRoadmap?._id;
    if (
      defaultId !== undefined &&
      !availableRoadmapsForDefault.includes(defaultId)
    ) {
      dispatch(
        modifyData({
          endpoint,
          fieldKey: 'defaultRoadmapId',
          value: availableRoadmapsForDefault[0]
            ? availableRoadmapsForDefault[0]
            : undefined,
        })
      );
    }
  }, [data]);
  return (
    <RouteContainer>
      <RouteHeader value={str.profile.header} />
      <h2>{str.profile.logged_in_as + ' ' + (user?.name || '...')}!</h2>
      <Columns>
        <NumberField
          endpoint={endpoint}
          fieldKey={'hourPrice'}
          value={data?.hourPrice}
          onChange={(value) =>
            dispatch(modifyData({ endpoint, fieldKey: 'hourPrice', value }))
          }
        />
        <ComboBoxField
          endpoint={endpoint}
          fieldKey={'defaultRoadmapId'}
          selected={data?.defaultRoadmapId ?? data?.defaultRoadmap?._id}
          options={roadmaps.data
            ?.map((r) => ({ id: r._id, name: r.name }))
            .filter((r) => availableRoadmapsForDefault.includes(r.id))}
          onChange={(value) =>
            dispatch(
              modifyData({
                endpoint,
                fieldKey: 'defaultRoadmapId',
                value,
              })
            )
          }
        />
      </Columns>
      <Columns columnsCount={1}>
        <ListBoxField
          endpoint={endpoint}
          fieldKey={'roadmapIds'}
          selected={data?.roadmapIds ?? data?.roadmaps?.map((r) => r._id)}
          options={roadmaps.data?.map((r) => ({ id: r._id, name: r.name }))}
          onChange={(value) =>
            dispatch(
              modifyData({
                endpoint,
                fieldKey: 'roadmapIds',
                value,
              })
            )
          }
        />
      </Columns>
      <ActionsWrapper hasBorder={false}>
        <IconTextButton
          name={str.buttons.update}
          icon={faSave}
          disabled={!isModified}
          onClick={() =>
            dispatch(
              saveData({
                endpoint,
                onSuccess: () => {
                  dispatch(getData({ endpoint }));
                  dispatch(
                    setNotification({
                      id: 'Profile:save:success',
                      type: 'text',
                      icon: faSave,
                      value: str.notifications.saved,
                      created: new Date().getTime(),
                    })
                  );
                },
              })
            )
          }
        />
      </ActionsWrapper>
      <HorizontalDivider />
      <h3>{str.profile.users_waiting_authentication}</h3>
      <StyledList>
        {unauthenticatedUsers?.length === 0 && (
          <StyledListItem>
            <span>{str.profile.no_users}</span>
          </StyledListItem>
        )}
        {unauthenticatedUsers?.map((u) => (
          <StyledListItem key={u._id}>
            <span>{u.name}</span>
            <ActionsWrapper hasBorder={false}>
              <StyledListButton
                title={str.buttons.remove}
                onClick={() => handleRemoveUser(u._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </StyledListButton>
              <StyledListButton
                title={str.buttons.authenticate}
                onClick={() => handleAuthenticateUser(u._id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </StyledListButton>
            </ActionsWrapper>
          </StyledListItem>
        ))}
      </StyledList>
      <h3>{str.profile.authenticated_users}</h3>
      <StyledList>
        {authenticatedUsers?.map((u) => (
          <StyledListItem key={u._id}>
            <span>{u.name}</span>
            <ActionsWrapper hasBorder={false}>
              <StyledListButton
                title={str.buttons.unauthenticate}
                disabled={u._id === user?._id || authenticatedUsers.length <= 1}
                onClick={() => handleUnauthenticateUser(u._id)}
              >
                <FontAwesomeIcon icon={faCheckSquare} />
              </StyledListButton>
            </ActionsWrapper>
          </StyledListItem>
        ))}
      </StyledList>
    </RouteContainer>
  );
};
