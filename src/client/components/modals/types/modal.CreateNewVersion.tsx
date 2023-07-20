import React from 'react';
import styled from 'styled-components';
import { ICreateNewVersion, removeModal } from 'reducers/reducer.modals';
import { Columns } from '../../common/Columns';
import { NumberField } from 'components/common/fields/field.NumberField';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useStrings } from 'hooks/hook.useStrings';
import { saveData } from 'reducers/reducer.data';
import {
  setErrorNotifications,
  setNotification,
} from 'reducers/reducer.notifications';
import { TextField } from 'components/common/fields/field.TextField';
import { useData } from 'hooks/hook.useData';
import { getErrorMessages } from 'utilities/utilities.errors';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CreateNewVersion = ({ id, endpoint }: ICreateNewVersion) => {
  const dispatch = useAppDispatch();
  const { data } = useData<{ major: number; minor: number; codename: string }>(
    endpoint,
    false
  );
  const str = useStrings();
  return (
    <>
      <Columns>
        <NumberField
          endpoint={endpoint}
          fieldKey={'major'}
          value={data?.major}
          min={0}
          max={10240}
        />
        <NumberField
          endpoint={endpoint}
          fieldKey={'minor'}
          value={data?.minor}
          min={0}
          max={10240}
        />
      </Columns>
      <Columns columnsCount={1}>
        <TextField
          endpoint={endpoint}
          fieldKey={'codename'}
          value={data?.codename}
        />
        <StyledButtons>
          <IconTextButton
            name={str.buttons.save}
            icon={faSave}
            disabled={!data || data?.major < 0 || data?.minor < 0}
            onClick={() =>
              dispatch(
                saveData({
                  endpoint,
                  resource: endpoint,
                  data: {
                    major: data?.major ?? 0,
                    minor: data?.minor ?? 0,
                    codename: data?.codename,
                  },
                  onSuccess: () => {
                    dispatch(removeModal(id));
                    dispatch(
                      setNotification({
                        id: 'CreateNewVersion:save:success',
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
            onClick={() => dispatch(removeModal(id))}
          />
        </StyledButtons>
      </Columns>
    </>
  );
};
