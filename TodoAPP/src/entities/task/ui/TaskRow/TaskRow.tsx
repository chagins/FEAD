import React, { PropsWithChildren, ReactNode } from 'react';
import { type TTask } from 'shared/api';
import { StyledRouterLink } from 'shared/ui';
import { StyledPaper } from './TaskRow.styled';

export type TTaskRowProps = PropsWithChildren<{
  data: TTask;
  titleHref: string;
  before: ReactNode;
}>;

export const TaskRow = ({ data, titleHref, before }: TTaskRowProps) => {
  const title = <StyledRouterLink to={titleHref}>{data.title}</StyledRouterLink>;

  return (
    <StyledPaper isCompleted={data.completed}>
      {before}
      {title}
    </StyledPaper>
  );
};
