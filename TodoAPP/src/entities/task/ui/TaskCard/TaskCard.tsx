import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { type TTask } from 'shared/api';

import { StyledCard } from './TaskCard.styled';

export type TTaskCardProps = {
  data: TTask;
  titleAction: React.ReactNode;
  firstCardAction: React.ReactNode;
  secondCardAction: React.ReactNode;
};

export const TaskCard = ({
  data,
  titleAction,
  firstCardAction,
  secondCardAction,
}: TTaskCardProps) => {
  return (
    <StyledCard>
      <CardHeader title={`Task #${data.id}`} action={titleAction} />
      <CardContent>
        <Typography>{data.title}</Typography>
      </CardContent>
      <CardActions className="cardActions">
        {firstCardAction}
        {secondCardAction}
      </CardActions>
    </StyledCard>
  );
};
