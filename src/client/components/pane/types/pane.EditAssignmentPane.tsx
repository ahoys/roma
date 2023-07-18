import React from 'react';
import { useData } from 'hooks/hook.useData';
import { IEditAssignmentPane, removePane } from 'reducers/reducer.pane';
import { Columns } from '../../common/Columns';
import { NumberField } from '../../common/fields/field.NumberField';
import { TextField } from '../../common/fields/field.TextField';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { ActionsWrapper } from '../../common/ActionsWrapper';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { SwitchField } from '../../common/fields/field.SwitchField';
import { modifyData, removeData, saveData } from 'reducers/reducer.data';
import {
  setNotification,
  setErrorNotifications,
} from 'reducers/reducer.notifications';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { getErrorMessages } from 'utilities/utilities.errors';
import { LargeTag } from 'components/common/LargeTag';
import { Comments } from 'components/common/comments/Comments';
import { HorizontalDivider } from 'components/common/HorizontalDivider';
import { AssignmentDTO } from 'dtos/dto.AssignmentDTO';

export const EditAssignmentPane = ({ id }: IEditAssignmentPane) => {
  const dispatch = useAppDispatch();
  const endpoint = `assignments/${id}`;
  const str = useStrings();
  const { data } = useData<AssignmentDTO>(endpoint);
  /**
   * Save the altered data.
   */
  const handleSave = () =>
    dispatch(
      saveData({
        endpoint,
        onSuccess: () => {
          dispatch(
            setNotification({
              id: 'success',
              icon: faSave,
              value: str.notifications.saved,
              created: new Date().getTime(),
              type: 'text',
            })
          );
        },
        onFailure: (err) =>
          dispatch(setErrorNotifications(getErrorMessages(err))),
      })
    );
  /**
   * Switches to done.
   */
  const handleDone = (value: boolean) =>
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'done',
        value,
      })
    );
  /**
   * Switches to workhours
   */
  const handleWorkhours = (value: number) =>
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'workHoursEstimate',
        value,
      })
    );
  /**
   * Removes assignment.
   */
  const handleRemove = () =>
    dispatch(
      removeData({
        endpoint,
        onSuccess: () => {
          dispatch(removePane());
          dispatch(
            setNotification({
              id: 'removed',
              icon: faTrash,
              value: str.notifications.removed,
              created: new Date().getTime(),
              type: 'text',
            })
          );
        },
      })
    );
  return (
    <>
      <ActionsWrapper hasBorder={true}>
        <IconTextButton
          icon={faSave}
          name={str.buttons.update}
          hasBackground={false}
          onClick={handleSave}
        />
        <IconTextButton
          icon={faTrash}
          name={str.buttons.remove}
          hasBackground={false}
          danger={true}
          onClick={handleRemove}
        />
      </ActionsWrapper>
      <Columns columnsCount={1}>
        <TextField
          endpoint={endpoint}
          fieldKey={'user'}
          value={data?.user?.name}
          readonly={true}
        />
        <NumberField
          endpoint={endpoint}
          fieldKey={'workHoursEstimate'}
          value={data?.workHoursEstimate}
          readonly={data?.done}
          min={0}
          max={10240}
          onChange={handleWorkhours}
        />
        <NumberField
          endpoint={endpoint}
          fieldKey={'hourPrice'}
          min={0}
          max={1024}
          value={data?.hourPrice}
        />
        <SwitchField
          endpoint={endpoint}
          fieldKey={'done'}
          value={data?.done}
          onChange={handleDone}
        />
      </Columns>
      <LargeTag
        value={`${(data?.hourPrice ?? 0) * (data?.workHoursEstimate ?? 0)} €`}
      />
      <HorizontalDivider />
      <Comments parent={data?._id} endpoint={'assignment-comments'} />
    </>
  );
};
