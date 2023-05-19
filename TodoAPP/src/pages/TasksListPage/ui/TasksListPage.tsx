import React from 'react';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { TasksList } from 'widgets/TasksList';

export const TasksListPage = () => {
  return (
    <Container maxWidth="md">
      <Typography pt={2} variant="h2" align="center">
        Tasks list
      </Typography>
      <TasksList />
    </Container>
  );
};
