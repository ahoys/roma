import React, { useEffect } from 'react';
import axios from 'axios';
import config from 'config';
import { useData } from 'hooks/hook.useData';
import { INewRequirementPane, removePane } from 'reducers/reducer.pane';
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
import { RequirementDTO } from 'dtos/dto.RequirementDTO';
import { SwitchField } from 'components/common/fields/field.SwitchField';
import { resetData, setDefaultData } from 'reducers/reducer.data';

const endpoint = 'requirements/0';

export const NewRequirementPane = ({ feature }: INewRequirementPane) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { data } = useData<RequirementDTO>(endpoint, false);
  const handleAddRequirement = () =>
    axios
      .post(config.api + 'requirements', {
        value: data?.value ?? '',
        functional: Boolean(data?.functional),
        featureId: feature,
      })
      .then(() => {
        dispatch(removePane());
        dispatch(
          setNotification({
            id: 'saved',
            icon: faSave,
            value: str.notifications.saved,
            created: new Date().getTime(),
            type: 'text',
          })
        );
      })
      .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))));
  /**
   * Reset the data if the pane is closed.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultData: any = { functional: true };
    dispatch(setDefaultData({ endpoint, data: defaultData }));
    return () => {
      dispatch(
        resetData({
          endpoint,
        })
      );
    };
  }, []);
  return (
    <>
      <Columns columnsCount={1}>
        <TextField endpoint={endpoint} fieldKey={'value'} value={data?.value} />
        <SwitchField
          endpoint={endpoint}
          fieldKey={'functional'}
          value={data?.functional}
        />
      </Columns>
      <ActionsWrapper justifyContent={'flex-end'}>
        <IconTextButton
          icon={faSave}
          name={str.buttons.create_requirement}
          hasBackground={false}
          disabled={typeof data?.value !== 'string' || data.value.trim() === ''}
          onClick={handleAddRequirement}
        />
      </ActionsWrapper>
    </>
  );
};
