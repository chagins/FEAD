import React from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { TasksList } from 'widgets/TasksList';

export const TasksListPage = () => {
  return (
    <>
      <Typography mt={2} variant="h1" align="center">
        Tasks list with <Link href="https://feature-sliced.design/ru/">feature sliced design</Link>{' '}
      </Typography>
      <TasksList />
    </>
  );
};
