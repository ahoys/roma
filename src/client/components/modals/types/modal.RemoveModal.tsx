import React from 'react';
import styled from 'styled-components';
import { IRemoveModal, removeModal } from 'reducers/reducer.modals';
import { Columns } from '../../common/Columns';
import { IconTextButton } from '../../common/buttons/button.IconTextButton';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useStrings } from 'hooks/hook.useStrings';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useNavigate } from 'react-router-dom';
import { getList, removeData } from 'reducers/reducer.data';
import { setNotification } from 'reducers/reducer.notifications';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RemoveModal = ({
  id,
  endpoint,
  resource,
  navigateTo,
}: IRemoveModal) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const str = useStrings();
  return (
    <Columns columnsCount={1}>
      <StyledButtons>
        <IconTextButton
          name={str.buttons.confirm}
          icon={faCheck}
          onClick={() => {
            dispatch(removeModal(id));
            navigate(navigateTo);
            dispatch(removeData({ endpoint })).then(() => {
              dispatch(getList({ endpoint: resource }));
              dispatch(
                setNotification({
                  id: 'RemoveModal',
                  type: 'text',
                  icon: faTrash,
                  value: str.notifications.removed,
                  created: new Date().getTime(),
                })
              );
            });
          }}
        />
        <IconTextButton
          name={str.buttons.cancel}
          icon={faTimes}
          onClick={() => dispatch(removeModal(id))}
        />
      </StyledButtons>
    </Columns>
  );
};
