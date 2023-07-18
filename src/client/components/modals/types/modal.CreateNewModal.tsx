import React from 'react';
import styled from 'styled-components';
import { ICreateNewModal, removeModal } from 'reducers/reducer.modals';
import { Columns } from '../../common/Columns';
import { TextField } from '../../common/fields/field.TextField';
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
import { getErrorMessages } from 'utilities/utilities.errors';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CreateNewModal = ({ id, endpoint }: ICreateNewModal) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  return (
    <Columns columnsCount={1}>
      <TextField endpoint={endpoint} fieldKey={'name'} value={''} />
      <StyledButtons>
        <IconTextButton
          name={str.buttons.save}
          icon={faSave}
          onClick={() =>
            dispatch(
              saveData({
                endpoint,
                resource: endpoint,
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
          onClick={() => dispatch(removeModal(id))}
        />
      </StyledButtons>
    </Columns>
  );
};
