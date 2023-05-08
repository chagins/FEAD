import React, { PropsWithChildren, ReactNode } from 'react';
import { type TTask } from 'shared/api';
import { Link } from 'react-router-dom';
import { StyledTaskRow } from './TaskRow.styled';

export type TTaskRowProps = PropsWithChildren<{
  data: TTask;
  titleHref: string;
  before: ReactNode;
}>;

export const TaskRow = ({ data, titleHref, before }: TTaskRowProps) => {
  const title = <Link to={titleHref}>{data.title}</Link>;

  return (
    <StyledTaskRow isCompleted={data.completed}>
      {before}
      {title}
    </StyledTaskRow>
  );
};
