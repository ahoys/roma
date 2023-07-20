import axios from 'axios';
import config from 'config';
import { useState, useEffect, useRef } from 'react';
import { setErrorNotifications } from 'reducers/reducer.notifications';
import { useAppDispatch } from './hook.useAppDispatch';
import { getErrorMessages } from 'utilities/utilities.errors';
import { RequirementCommentDTO } from 'dtos/dto.RequirementCommentDTO';
import { AssignmentCommentDTO } from 'dtos/dto.AssignmentCommentDTO';

type TSupportedComments = RequirementCommentDTO | AssignmentCommentDTO;

/**
 * Fetches, sends, edits and removes comments.
 */
export const useComments = (
  parent: number | undefined,
  endpoint: string | undefined,
  clearMsg: (msg: string) => void
): {
  data: TSupportedComments[];
  isLoading: boolean;
  editCommentId: number | undefined;
  handleSendComment: (comment: string) => void;
  handleEditComment: (id: number, comment: string) => void;
  handleRemoveComment: (id: number) => void;
  handleSetEditCommentId: (editCommentId: number | undefined) => void;
} => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<TSupportedComments[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState<number | undefined>(
    undefined
  );
  const timeout = useRef<NodeJS.Timeout>();
  /**
   * Fetches the comments from the backend if the endpoint
   * and parent are defined.
   */
  const handleFetchComments = () => {
    if (endpoint && parent !== undefined && !isLoading) {
      setIsLoading(true);
      axios
        .get<TSupportedComments[] | undefined>(
          config.api + endpoint + '?parent=' + parent
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setData(response.data);
          }
        })
        .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))))
        .finally(() => setIsLoading(false));
    }
  };
  /**
   * Handles sending a comment to the backend.
   * @param comment Content of the comment.
   */
  const handleSendComment = (comment: string) => {
    if (!comment?.trim()) return;
    setIsLoading(true);
    axios
      .post(config.api + endpoint, { parentId: parent, value: comment })
      .then(() => {
        handleFetchComments();
        clearMsg('');
      })
      .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))));
  };
  /**
   * Handles editing a comment.
   * @param id Id of the comment.
   * @param comment Content of the comment.
   */
  const handleEditComment = (id: number, comment: string) => {
    setIsLoading(true);
    axios
      .put(config.api + endpoint + '/' + id, { value: comment })
      .then(() => {
        setEditCommentId(undefined);
        handleFetchComments();
        clearMsg('');
      })
      .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))));
  };
  /**
   * Handles removing a comment.
   * @param id Id of the comment.
   */
  const handleRemoveComment = (id: number) => {
    setIsLoading(true);
    axios
      .delete(config.api + endpoint + '/' + id)
      .then(() => handleFetchComments())
      .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))));
  };
  /**
   * Automatically fetches the comments when the endpoint changes,
   * also polls the comments every n seconds.
   */
  useEffect(() => {
    const handlePoll = () => {
      handleFetchComments();
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        handlePoll();
      }, 2048);
    };
    handlePoll();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [endpoint, parent]);
  return {
    data,
    isLoading,
    editCommentId,
    handleSendComment,
    handleEditComment,
    handleRemoveComment,
    handleSetEditCommentId: (v) => setEditCommentId(v),
  };
};
