import React, { PropsWithChildren, ReactNode } from 'react';
import { type TTask } from 'shared/api';
import { Link } from '@mui/material';
import { StyledTaskRow } from './TaskRow.styled';

export type TTaskRowProps = PropsWithChildren<{
  data: TTask;
  titleHref: string;
  before: ReactNode;
}>;

export const TaskRow = ({ data, titleHref, before }: TTaskRowProps) => {
  const title = (
    <Link href={titleHref} variant="caption">
      {data.title}
    </Link>
  );

  return (
    <StyledTaskRow isCompleted={data.completed}>
      {before}
      {title}
    </StyledTaskRow>
  );
};
