import React, { useState } from 'react';
import styled from 'styled-components';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { IconTextButton } from '../buttons/button.IconTextButton';
import { TextAreaInput } from '../inputs/input.TextAreaInput';
import { Label } from '../Label';
import { useComments } from 'hooks/hook.useComments';
import { useStrings } from 'hooks/hook.useStrings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate';

const StyledVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledCommentsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledWriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledComment = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledCommentTextArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-radius: ${({ theme }) => theme.gap.small};
  padding: ${({ theme }) => theme.gap.normal};
  background: ${({ theme }) => theme.background.comment};
  color: ${({ theme }) => theme.color.comment};
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledCommentTextAreaL = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  p {
    font-size: 1rem;
    line-height: 1.5rem;
    min-height: 1.5rem;
  }
`;

const StyledCommentTextAreaR = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
`;

const StyledCommentTextAreaAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.gap.small};
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

const StyledCommentInfoArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.8rem;
  line-height: 1.2rem;
  opacity: 0.6;
  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.gap.small};
`;

interface IComments {
  parent: number | undefined;
  endpoint: string;
}

export const Comments = ({ parent, endpoint }: IComments) => {
  const str = useStrings();
  const [edit, setEdit] = useState<number | undefined>(undefined);
  const [msg, setMsg] = useState('');
  const {
    data,
    isLoading,
    handleSendComment,
    handleEditComment,
    handleRemoveComment,
  } = useComments(parent, endpoint, setMsg);
  const id = `Comments:${endpoint}`;
  return (
    <Label
      endpoint={endpoint}
      fieldKey={'comments'}
      htmlFor={id}
      name={str.fields.comments}
      canBeModified={false}
    >
      <StyledVerticalWrapper id={id}>
        <StyledWriteWrapper>
          <TextAreaInput
            id={`${id}:TextAreaInput`}
            title={str.inputs.write_comment}
            value={msg}
            readonly={isLoading}
            placeholder={str.inputs.write_comment}
            onChange={setMsg}
          />
          <StyledActions>
            <IconTextButton
              name={edit ? str.buttons.update : str.buttons.send}
              icon={edit ? faRotate : faPaperPlane}
              disabled={isLoading || !msg?.trim()}
              onClick={
                edit
                  ? () => handleEditComment(edit, msg)
                  : () => handleSendComment(msg)
              }
            />
          </StyledActions>
        </StyledWriteWrapper>
        <StyledCommentsWrapper>
          {data?.map((comment) => (
            <StyledComment key={comment._id}>
              <StyledCommentTextArea>
                <StyledCommentTextAreaL>
                  {comment.value
                    .replace(/\n{2,}/g, '\n\n')
                    .split(/\n/g)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((s: any, i: number) => (
                      <p key={i}>{s}</p>
                    ))}
                </StyledCommentTextAreaL>
                <StyledCommentTextAreaR>
                  <StyledCommentTextAreaAction
                    title={str.buttons.edit}
                    onClick={() => {
                      setEdit(comment._id);
                      setMsg(comment.value);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </StyledCommentTextAreaAction>
                  <StyledCommentTextAreaAction
                    title={str.buttons.remove}
                    onClick={() => handleRemoveComment(comment._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </StyledCommentTextAreaAction>
                </StyledCommentTextAreaR>
              </StyledCommentTextArea>
              <StyledCommentInfoArea>
                <p>
                  {comment.user?.name}{' '}
                  {comment._updated_at === comment._created_at
                    ? str.comment.user_sent_comment
                    : str.comment.user_updated_comment}{' '}
                  {new Date(comment._updated_at).toLocaleString('fi')}
                </p>
              </StyledCommentInfoArea>
            </StyledComment>
          ))}
        </StyledCommentsWrapper>
      </StyledVerticalWrapper>
    </Label>
  );
};
