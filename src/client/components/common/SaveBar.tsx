import React from 'react';
import styled from 'styled-components';
import config from 'config';
import { IconTextButton } from './buttons/button.IconTextButton';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons/faBackwardStep';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import {
  exportDataToGitLab,
  getData,
  resetData,
  saveData,
} from 'reducers/reducer.data';
import { useNavigate } from 'react-router-dom';
import { useStrings } from 'hooks/hook.useStrings';
import { setNotification } from 'reducers/reducer.notifications';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { setModal } from 'reducers/reducer.modals';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';

interface IStyledSaveBar {
  isMobile: boolean;
}

const StyledSaveBar = styled.div<IStyledSaveBar>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.gap.small};
  & > button {
    ${({ isMobile }) => (isMobile ? 'flex: 1 1 auto;' : '')}
  }
`;

interface ISaveBar {
  endpoint: string;
  resource: string;
  hasExportToGitLab?: boolean;
}

export const SaveBar = ({
  endpoint,
  resource,
  hasExportToGitLab,
}: ISaveBar) => {
  const str = useStrings();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modified = useAppSelector((state) => state.data.modified)[endpoint];
  const screenFormat = useAppSelector((state) => state.device.screenFormat);
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const hasBackButton = screenFormat !== 'wide';
  const isMobile = screenFormat === 'mobile';
  /**
   * Removes the given item.
   */
  const handleRemoveData = () =>
    dispatch(
      setModal({
        id: 'handleRemoveData',
        type: 'remove',
        endpoint,
        resource,
        title: str.titles.confirmRemove,
        created: new Date().getTime(),
        navigateTo: roadmap
          ? config.publicPath + 'r/' + roadmap + '/' + resource
          : config.publicPath + resource,
      })
    );
  /**
   * Saves the given item.
   */
  const handleSaveData = () =>
    dispatch(
      saveData({
        endpoint,
        resource,
        onSuccess: () => {
          dispatch(getData({ endpoint }));
          dispatch(
            setNotification({
              id: 'handleSaveData',
              type: 'text',
              icon: faSave,
              value: str.notifications.saved,
              created: new Date().getTime(),
            })
          );
        },
        onFailure: (err) => {
          const code = err?.code;
          const errorData = err?.response?.data;
          if (Array.isArray(errorData)) {
            let i = 0;
            for (const error of errorData) {
              dispatch(
                setNotification({
                  id: 'handleSaveData:' + i,
                  type: 'text',
                  icon: faSkull,
                  value: error?.message ?? '',
                  created: new Date().getTime(),
                })
              );
              i += 1;
            }
          } else {
            setNotification({
              id: 'handleSaveData:error',
              type: 'text',
              icon: faSkull,
              value: code ?? 'Generic Error',
              created: new Date().getTime(),
            });
          }
        },
      })
    );
  /**
   * Resets the given item.
   */
  const handleResetData = () =>
    dispatch(
      resetData({
        endpoint,
        onSuccess: () =>
          dispatch(
            setNotification({
              id: 'handleResetData',
              type: 'text',
              icon: faSave,
              value: str.notifications.reset,
              created: new Date().getTime(),
            })
          ),
      })
    );
  /**
   * Exports the given item to GitLab.
   */
  const handleExportToGitLab = () =>
    dispatch(
      exportDataToGitLab({
        endpoint,
      })
    );
  return (
    <StyledSaveBar isMobile={isMobile}>
      {hasBackButton && (
        <IconTextButton
          name={str.buttons.back}
          icon={faBackwardStep}
          onClick={() => navigate(-1)}
        />
      )}
      <IconTextButton
        name={str.buttons.remove}
        icon={faTrash}
        danger={true}
        onClick={handleRemoveData}
      />
      <IconTextButton
        name={str.buttons.undo}
        icon={faUndo}
        disabled={!modified}
        onClick={handleResetData}
      />
      <IconTextButton
        name={str.buttons.save}
        icon={faSave}
        disabled={!modified}
        onClick={handleSaveData}
      />
      {config.features.gitlab && hasExportToGitLab ? (
        <IconTextButton
          name={str.buttons.exportToGitLab}
          icon={faFileExport}
          onClick={handleExportToGitLab}
        />
      ) : null}
    </StyledSaveBar>
  );
};
