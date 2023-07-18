import React from 'react';
import styled from 'styled-components';
import { useStrings } from 'hooks/hook.useStrings';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconTextButton } from './buttons/button.IconTextButton';
import { ActionsWrapper } from './ActionsWrapper';
import { useAppDispatch } from 'hooks/hook.useAppDispatch';
import { setPane } from 'reducers/reducer.pane';
import { Description } from './Description';
import { LargeTag } from './LargeTag';
import { FeatureDTO } from 'dtos/dto.FeatureDTO';

const StyledRequirements = styled.label`
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
  align-items: center;
  padding: ${({ theme }) => theme.gap.small};
  gap: ${({ theme }) => theme.gap.normal};
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

interface IRequirements {
  feature?: FeatureDTO;
  disabled?: boolean;
}

export const Requirements = ({ feature, disabled }: IRequirements) => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const htmlFor = 'Requirements';
  const fulfilled =
    feature?.requirements?.reduce(
      (value, b) => value + (b.fulfilled ? 1 : 0),
      0
    ) || 0;
  const requirementsLen = feature?.requirements?.length || 0;
  /**
   * Adds a new requirement and updates the data.
   */
  const handleAddRequirement = () => {
    if (feature) {
      dispatch(
        setPane({
          title: str.panes.add_requirement,
          forced: false,
          data: {
            type: 'new-requirement-pane',
            feature: feature._id,
          },
        })
      );
    }
  };
  /**
   * Previews an existing assignment and possibly edits.
   */
  const handleEditRequirement = (id: number) => {
    dispatch(
      setPane({
        title: str.panes.edit_requirement,
        forced: false,
        data: {
          type: 'edit-requirement-pane',
          id,
        },
      })
    );
  };
  return (
    <StyledRequirements htmlFor={htmlFor}>
      {str.fields.requirements}
      <Description value={str.descriptions.requirements} />
      <StyledContent>
        <ActionsWrapper>
          <IconTextButton
            name={str.buttons.create_requirement}
            icon={faPlus}
            disabled={disabled}
            hasBackground={false}
            onClick={handleAddRequirement}
          />
        </ActionsWrapper>
        <StyledUl>
          {feature?.requirements?.map((r) => (
            <StyledLi key={r._id} onClick={() => handleEditRequirement(r._id)}>
              <StyledFulfilled fulfilled={r.fulfilled}>
                <FontAwesomeIcon
                  icon={r.fulfilled ? faCheckSquare : faSquare}
                />
              </StyledFulfilled>
              <StyledValue>{r.value}</StyledValue>
            </StyledLi>
          ))}
        </StyledUl>
        <LargeTag
          value={
            requirementsLen
              ? `${Math.ceil((fulfilled / requirementsLen) * 100)} %`
              : '...'
          }
        />
      </StyledContent>
    </StyledRequirements>
  );
};
