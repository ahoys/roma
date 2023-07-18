import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ICreateNewFeature, removeModal } from 'reducers/reducer.modals';
import { Columns } from '../../common/Columns';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useStrings } from 'hooks/hook.useStrings';
import { modifyData, saveData } from 'reducers/reducer.data';
import {
  setErrorNotifications,
  setNotification,
} from 'reducers/reducer.notifications';
import { TextField } from 'components/common/fields/field.TextField';
import { ComboBoxField } from 'components/common/fields/field.ComboBox';
import { useList } from 'hooks/hook.useList';
import { useData } from 'hooks/hook.useData';
import { VersionDTO } from 'dtos/dto.VersionDTO';
import { getErrorMessages } from 'utilities/utilities.errors';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CreateNewFeature = ({
  id,
  endpoint,
  resource,
  versionId,
}: ICreateNewFeature) => {
  const dispatch = useAppDispatch();
  const versions = useList<VersionDTO[]>('versions');
  const { data } = useData<{ name: string; versionId: number }>(
    endpoint,
    false
  );
  const str = useStrings();
  /**
   * Set automatically selected versionId to data payload.
   */
  useEffect(() => {
    if (versionId !== undefined) {
      dispatch(
        modifyData({
          endpoint,
          fieldKey: 'versionId',
          value: versionId,
        })
      );
    }
  }, [versionId]);
  return (
    <Columns columnsCount={1}>
      <TextField endpoint={endpoint} fieldKey={'name'} value={data?.name} />
      <ComboBoxField
        endpoint={endpoint}
        fieldKey={'version'}
        selected={data?.versionId}
        options={versions.data.map((r) => ({
          id: r._id,
          name: `${r.major}.${r.minor}`,
        }))}
        onChange={(newValue) =>
          dispatch(
            modifyData({
              endpoint,
              fieldKey: 'versionId',
              value: newValue,
            })
          )
        }
      />
      <StyledButtons>
        <IconTextButton
          name={str.buttons.save}
          icon={faSave}
          onClick={() =>
            dispatch(
              saveData({
                endpoint,
                resource,
                onSuccess: () => {
                  dispatch(removeModal(id));
                  dispatch(
                    setNotification({
                      id: 'CreateNewModal:save:success',
                      type: 'text',
                      icon: faSave,
                      value: str.notifications.saved,
                      created: new Date().getTime(),
                    })
                  );
                },
                onFailure: (err) =>
                  dispatch(setErrorNotifications(getErrorMessages(err))),
              })
            )
          }
        />
        <IconTextButton
          name={str.buttons.close}
          icon={faTimes}
          danger={!!data}
          onClick={() => dispatch(removeModal(id))}
        />
      </StyledButtons>
    </Columns>
  );
};
