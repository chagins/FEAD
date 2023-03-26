import React, { PropsWithChildren, ReactNode } from 'react';
import { TTask } from 'shared/api/models';
import { Link } from 'react-router-dom';
import { StyledTaskRow } from './TaskRow.styled';

export type TTaskRowProps = PropsWithChildren<{
  data: TTask;
  titleHref: string;
  before: ReactNode;
}>;

export const TaskRow = ({ data, titleHref, before }: TTaskRowProps) => {
  const title = titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title;

  return (
    <StyledTaskRow completed={data.completed}>
      {before}
      {title}
    </StyledTaskRow>
  );
};
