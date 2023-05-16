import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { type TTask } from 'shared/api';

export type TTaskCardProps = {
  data: TTask;
  titleAction: React.ReactNode;
  cardAction: React.ReactNode;
};

export const TaskCard = ({ data, titleAction, cardAction }: TTaskCardProps) => {
  return (
    <Card>
      <CardHeader title={`Task #${data.id}`} action={titleAction} />
      <CardContent>
        <Typography>{data.title}</Typography>
      </CardContent>
      <CardActions>{cardAction}</CardActions>
    </Card>
  );
};
