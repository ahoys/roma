import React from 'react';
import config from 'config';
import { useMeta } from 'hooks/hook.useMeta';
import { useData } from 'hooks/hook.useData';
import { TextField } from '../common/fields/field.TextField';
import { Form } from '../common/Form';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { Columns } from '../common/Columns';
import { NumberField } from 'components/common/fields/field.NumberField';
import { ActionsWrapper } from 'components/common/ActionsWrapper';
import { IconTextButton } from 'components/common/buttons/button.IconTextButton';
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube';
import { HorizontalDivider } from 'components/common/HorizontalDivider';
import { useStrings } from 'hooks/hook.useStrings';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { SwitchField } from 'components/common/fields/field.SwitchField';
import { AssignmentDTO } from 'dtos/dto.AssignmentDTO';

export const Assignment = () => {
  const str = useStrings();
  const navigate = useNavigate();
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const { endpoint, resource } = useMeta('assignments');
  const { data } = useData<AssignmentDTO>(endpoint, true);
  return (
    <RouteContainer>
      <RouteHeader
        endpoint={endpoint}
        value={
          data ? `${data._id}: ${data.feature?.name}, ${data.user?.name}` : ''
        }
      />
      <Form endpoint={endpoint} resource={resource}>
        <Columns>
          <TextField
            endpoint={endpoint}
            fieldKey={'assignee'}
            value={data?.user?.name}
            readonly={true}
          />
          <TextField
            endpoint={endpoint}
            fieldKey={'feature'}
            value={data?.feature?.name}
            readonly={true}
          />
        </Columns>
        <ActionsWrapper hasBorder={false}>
          <IconTextButton
            icon={faCube}
            name={str.buttons.open_feature}
            onClick={() =>
              navigate(
                config.publicPath +
                  'r/' +
                  roadmap +
                  '/features/' +
                  data?.feature?._id
              )
            }
          />
        </ActionsWrapper>
        <HorizontalDivider />
        <Columns>
          <NumberField
            endpoint={endpoint}
            fieldKey={'workHoursEstimate'}
            value={data?.workHoursEstimate}
          />
          <NumberField
            endpoint={endpoint}
            fieldKey={'hourPrice'}
            value={data?.hourPrice}
          />
        </Columns>
        <HorizontalDivider />
        <Columns>
          <SwitchField
            endpoint={endpoint}
            fieldKey={'done'}
            value={data?.done}
          />
        </Columns>
      </Form>
    </RouteContainer>
  );
};
