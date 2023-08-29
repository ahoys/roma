import { useState, useEffect, useRef } from 'react';
import { setErrorNotifications } from 'reducers/reducer.notifications';
import { useAppDispatch } from './hook.useAppDispatch';
import { getErrorMessages } from 'utilities/utilities.errors';
import { RequirementCommentDTO } from 'dtos/dto.RequirementCommentDTO';
import { AssignmentCommentDTO } from 'dtos/dto.AssignmentCommentDTO';
import {
  deleteComment,
  getComments,
  sendComment,
  setWorkspace,
  updateComment,
} from 'reducers/reducer.comments';
import { useAppSelector } from './hook.useAppSelector';

type TSupportedComments = RequirementCommentDTO | AssignmentCommentDTO;

/**
 * Fetches, sends, edits and removes comments.
 */
export const useComments = (
  parent: number | undefined,
  endpoint: string | undefined
): {
  data: TSupportedComments[];
  isLoading: boolean;
  editCommentId: number | undefined;
  message: string;
  setMessage: (msg: string) => void;
  handleSendComment: (comment: string) => void;
  handleEditComment: (id: number, comment: string) => void;
  handleRemoveComment: (id: number) => void;
  handleSetEditCommentId: (editCommentId: number | undefined) => void;
} => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.comments.received[parent ?? -1]);
  const message = useAppSelector(
    (state) => state.comments.workspace[parent ?? -1]
  );
  const isRequirement = Boolean(endpoint?.startsWith('requirement-comments'));
  const [isLoading, setIsLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState<number | undefined>(
    undefined
  );
  const timeout = useRef<NodeJS.Timeout>();
  /**
   * Handles sending a comment to the backend.
   * @param comment Content of the comment.
   */
  const handleSendComment = (comment: string) => {
    if (!comment?.trim()) return;
    if (parent) {
      setIsLoading(true);
      dispatch(
        sendComment({
          parentId: parent,
          isRequirement,
          value: comment,
        })
      )
        .then(() => dispatch(getComments({ parentId: parent, isRequirement })))
        .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))))
        .finally(() => setIsLoading(false));
    }
  };
  /**
   * Handles editing a comment.
   * @param id Id of the comment.
   * @param comment Content of the comment.
   */
  const handleEditComment = (id: number, comment: string) => {
    if (parent) {
      setIsLoading(true);
      dispatch(
        updateComment({
          parentId: parent,
          _id: id,
          isRequirement,
          value: comment,
        })
      )
        .then(() => dispatch(getComments({ parentId: parent, isRequirement })))
        .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))))
        .finally(() => setIsLoading(false));
    }
  };
  /**
   * Handles removing a comment.
   * @param id Id of the comment.
   */
  const handleRemoveComment = (id: number) => {
    if (parent) {
      setIsLoading(true);
      dispatch(deleteComment({ _id: id, isRequirement }))
        .then(() => dispatch(getComments({ parentId: parent, isRequirement })))
        .catch((err) => dispatch(setErrorNotifications(getErrorMessages(err))))
        .finally(() => setIsLoading(false));
    }
  };
  /**
   * Automatically fetches the comments when the endpoint changes,
   * also polls the comments every n seconds.
   */
  useEffect(() => {
    if (parent) {
      const handlePoll = () => {
        dispatch(
          getComments({
            parentId: parent,
            isRequirement,
          })
        );
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          handlePoll();
        }, 2048);
      };
      handlePoll();
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [endpoint, parent]);
  return {
    data: data || [],
    isLoading,
    editCommentId,
    message: message ?? '',
    setMessage: (value: string) =>
      parent ? dispatch(setWorkspace({ parentId: parent, value })) : {},
    handleSendComment,
    handleEditComment,
    handleRemoveComment,
    handleSetEditCommentId: (v) => setEditCommentId(v),
  };
};
