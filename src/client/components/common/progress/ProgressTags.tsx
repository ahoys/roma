import React from 'react';
import styled from 'styled-components';
import { TagDTO } from 'dtos/dto.TagDTO';

const StyledTags = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.gap.small};
`;

const StyledTag = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  line-height: 1.2rem;
  font-weight: 400;
  border-radius: ${({ theme }) => theme.gap.tiny};
  padding: ${({ theme }) => theme.gap.small};
  background: ${({ theme }) => theme.background.tag};
  color: ${({ theme }) => theme.color.tag};
`;

interface IProgressTags {
  tags: TagDTO[] | null;
}

export const ProgressTags = ({ tags }: IProgressTags) => (
  <StyledTags>
    {(tags || []).map((t) => (
      <StyledTag title={`${t.name} ${t.weight}`} key={t._id}>
        {t.name}
      </StyledTag>
    ))}
  </StyledTags>
);
