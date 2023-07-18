import React, { useEffect } from 'react';
import axios from 'axios';
import config from 'config';
import { useData } from 'hooks/hook.useData';
import { INewAssignmentPane, removePane } from 'reducers/reducer.pane';
import { Columns } from '../../common/Columns';
import { NumberField } from '../../common/fields/field.NumberField';
import { ActionsWrapper } from '../../common/ActionsWrapper';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import {
  setErrorNotifications,
  setNotification,
} from 'reducers/reducer.notifications';
import { ComboBoxField } from '../../common/fields/field.ComboBox';
import { getErrorMessages } from 'utilities/utilities.errors';
import { modifyData } from 'reducers/reducer.data';
import { AssignmentDTO } from 'dtos/dto.AssignmentDTO';
import { UserDTO } from 'dtos/dto.UserDTO';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { useWhoAmI } from 'hooks/hook.useWhoAmI';

const endpoint = 'assignments/0';

export const NewAssignmentPane = ({ feature }: INewAssignmentPane) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const whoami = useWhoAmI();
  const { data } = useData<AssignmentDTO>(endpoint, false);
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const users = useData<UserDTO[]>('users?roadmap=' + roadmap);
  /**
   * As a new user is selected, automatically set
   * the hourPrice of the user to be the price.
   * @param userId
   */
  const handleSelectUser = (userId: number) => {
    const user = users.data?.find((u) => u._id === userId);
    if (user) {
      dispatch(
        modifyData({
          endpoint,
          fieldKey: 'userId',
          value: Number(user._id),
        })
      ).then(() => {
        dispatch(
          modifyData({
            endpoint,
            fieldKey: 'hourPrice',
            value: Number(user.hourPrice),
          })
        );
      });
    }
  };
  /**
   * Saves the assignment.
   */
  const handleAddAssignment = () =>
    axios
      .post(config.api + 'assignments', {
        workHoursEstimate: data?.workHoursEstimate,
        userId: data?.userId,
        hourPrice: data?.hourPrice,
        featureId: feature,
      })
      .then(() => {
        dispatch(removePane());
        dispatch(
          setNotification({
            id: 'saved',
            icon: faSave,
            value: '',
            created: new Date().getTime(),
            type: 'text',
          })
        );
      })
      .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))));
  /**
   * If the user is logged in, automatically set the
   * userId and hourPrice to be the same as the user.
   */
  useEffect(() => {
    if (data?.userId === undefined && users.data?.length && whoami.user) {
      const me = users.data.find((u) => u._id === whoami.user?._id);
      if (me) {
        dispatch(
          modifyData({
            endpoint,
            fieldKey: 'userId',
            value: Number(me._id),
          })
        ).then(() => {
          dispatch(
            modifyData({
              endpoint,
              fieldKey: 'hourPrice',
              value: Number(me.hourPrice),
            })
          );
        });
      }
    }
  }, [data, users]);
  return (
    <>
      <ActionsWrapper>
        <IconTextButton
          icon={faSave}
          name={str.buttons.assign}
          hasBackground={false}
          disabled={data?.userId === undefined}
          onClick={handleAddAssignment}
        />
      </ActionsWrapper>
      <Columns columnsCount={1}>
        <ComboBoxField
          endpoint={endpoint}
          fieldKey={'user'}
          selected={data?.userId}
          options={users.data?.map((u) => ({ id: u._id, name: u.name }))}
          onChange={handleSelectUser}
        />
        <NumberField
          endpoint={endpoint}
          fieldKey={'workHoursEstimate'}
          min={0}
          max={10240}
          value={data?.workHoursEstimate}
        />
        <NumberField
          endpoint={endpoint}
          fieldKey={'hourPrice'}
          min={0}
          max={1024}
          value={data?.hourPrice}
        />
      </Columns>
    </>
  );
};
