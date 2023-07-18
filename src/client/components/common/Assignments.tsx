import React from 'react';
import styled from 'styled-components';
import { useStrings } from 'hooks/hook.useStrings';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionsWrapper } from './ActionsWrapper';
import { IconTextButton } from './buttons/button.IconTextButton';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setPane } from 'reducers/reducer.pane';
import { Description } from './Description';
import { LargeTag } from './LargeTag';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';

const StyledAssignments = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 512px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.gap.small};
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledLiColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledLiRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.normal};
`;

const StyledLiTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.8rem;
  line-height: 1.3rem;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledValue = styled.p`
  display: flex;
  flex: 1 1 auto;
  font-size: 1rem;
  line-height: 1.5rem;
`;

interface IStyledFulfilled {
  fulfilled: boolean;
}

const StyledFulfilled = styled.div<IStyledFulfilled>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, fulfilled }) =>
    fulfilled ? theme.special.true : 'inherit'};
`;

interface IAssignments {
  feature?: FeatureDTO;
  disabled?: boolean;
}

export const Assignments = ({ feature, disabled }: IAssignments) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const htmlFor = 'Assignments';
  const totalTime =
    feature?.assignments?.reduce(
      (value, b) => value + b.workHoursEstimate,
      0
    ) || 0;
  const totalPrice =
    feature?.assignments?.reduce(
      (value, b) => value + b.workHoursEstimate * b.hourPrice,
      0
    ) || 0;
  /**
   * Adds a new assignment and updates the data.
   */
  const handleAddAssignment = () => {
    if (feature) {
      dispatch(
        setPane({
          title: str.panes.add_assignment,
          forced: false,
          data: {
            type: 'new-assignment-pane',
            feature: feature._id,
          },
        })
      );
    }
  };
  /**
   * Previews an existing assignment and possibly edits.
   */
  const handleEditAssignment = (id: number) => {
    dispatch(
      setPane({
        title: str.panes.edit_assignment,
        forced: false,
        data: {
          type: 'edit-assignment-pane',
          id,
        },
      })
    );
  };
  return (
    <StyledAssignments htmlFor={htmlFor}>
      {str.fields.assignments}
      <Description value={str.descriptions.assignments} />
      <StyledContent>
        <ActionsWrapper>
          <IconTextButton
            name={str.buttons.assign}
            icon={faPlus}
            disabled={disabled}
            hasBackground={false}
            onClick={handleAddAssignment}
          />
        </ActionsWrapper>
        <StyledUl>
          {feature?.assignments?.map((r) => (
            <StyledLi key={r._id} onClick={() => handleEditAssignment(r._id)}>
              <StyledLiRow>
                <StyledFulfilled fulfilled={r.done}>
                  <FontAwesomeIcon icon={r.done ? faCheckSquare : faSquare} />
                </StyledFulfilled>
              </StyledLiRow>
              <StyledLiColumn>
                <StyledLiRow>
                  <StyledValue>{r.user?.name}</StyledValue>
                </StyledLiRow>
                <StyledLiRow>
                  <StyledLiTag>
                    <FontAwesomeIcon icon={faClock} />
                    {r.workHoursEstimate}
                    {`h (${Math.round(
                      (r.workHoursEstimate / totalTime || 1) * 100
                    )}%)`}
                  </StyledLiTag>
                  <StyledLiTag>
                    <FontAwesomeIcon icon={faMoneyBill} />
                    {r.workHoursEstimate * r.hourPrice}€
                  </StyledLiTag>
                </StyledLiRow>
              </StyledLiColumn>
            </StyledLi>
          ))}
        </StyledUl>
        <LargeTag value={`${totalPrice} €`} />
      </StyledContent>
    </StyledAssignments>
  );
};
