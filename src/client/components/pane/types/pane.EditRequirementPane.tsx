import React from 'react';
import { useData } from 'hooks/hook.useData';
import { IEditRequirementPane, removePane } from 'reducers/reducer.pane';
import { Columns } from '../../common/Columns';
import { ActionsWrapper } from '../../common/ActionsWrapper';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { useStrings } from 'hooks/hook.useStrings';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import {
  setErrorNotifications,
  setNotification,
} from 'reducers/reducer.notifications';
import { getErrorMessages } from 'utilities/utilities.errors';
import { TextField } from 'components/common/fields/field.TextField';
import { modifyData, removeData, saveData } from 'reducers/reducer.data';
import { SwitchField } from 'components/common/fields/field.SwitchField';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Comments } from 'components/common/comments/Comments';
import { HorizontalDivider } from 'components/common/HorizontalDivider';
import { RequirementDTO } from 'dtos/dto.RequirementDTO';

export const EditRequirementPane = ({ id }: IEditRequirementPane) => {
  const dispatch = useAppDispatch();
  const endpoint = `requirements/${id}`;
  const str = useStrings();
  const { data } = useData<RequirementDTO>(endpoint);
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
   * Switches to workhours
   */
  const handleValue = (value: string) =>
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'value',
        value,
      })
    );
  /**
   * Switches to done.
   */
  const handleFulfilled = (value: boolean) =>
    dispatch(
      modifyData({
        endpoint,
        fieldKey: 'fulfilled',
        value,
      })
    );
  /**
   * Removes requirement.
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
      <Columns columnsCount={1}>
        <TextField
          endpoint={endpoint}
          fieldKey={'value'}
          value={data?.value}
          readonly={data?.fulfilled}
          onChange={handleValue}
        />
        <SwitchField
          endpoint={endpoint}
          fieldKey={'fulfilled'}
          value={data?.fulfilled}
          onChange={handleFulfilled}
        />
      </Columns>
      <ActionsWrapper justifyContent={'flex-end'}>
        <IconTextButton
          icon={faTrash}
          name={str.buttons.remove}
          hasBackground={false}
          danger={true}
          onClick={handleRemove}
        />
        <IconTextButton
          icon={faSave}
          name={str.buttons.update}
          hasBackground={false}
          onClick={handleSave}
        />
      </ActionsWrapper>
      <HorizontalDivider />
      <Comments parent={data?._id} endpoint={'requirement-comments'} />
    </>
  );
};
