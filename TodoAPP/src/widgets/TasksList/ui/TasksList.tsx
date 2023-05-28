import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { AlertTitle } from '@mui/material';
import { TaskRow, taskModel } from 'entities/task';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { ToggleTask, FilterTasks } from 'features/tasks';
import Alert from '@mui/material/Alert';

import { StyledBox } from './TasksList.styled';

export const TasksList = () => {
  const dispatch = useAppDispatch();
  const [tasksStatus, tasksError] = useAppSelector((state) => [
    state.tasks.status,
    state.tasks.error,
  ]);
  const tasks = useAppSelector(taskModel.selectAllTasks);

  useEffect(() => {
    if (tasksStatus === 'idle') {
      dispatch(taskModel.fetchTasksQuery());
    }
  }, [dispatch, tasksStatus]);

  return (
    <StyledBox>
      <FilterTasks />
      {tasksStatus === 'pending' && <CircularProgress />}
      {tasksStatus === 'rejected' && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {tasksError}
        </Alert>
      )}
      {tasksStatus === 'fulfilled' && (
        <Stack className="tasksStack">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              data={task}
              titleHref={`/tasks/${task.id}`}
              before={<ToggleTask id={task.id} isCompleted={task.completed} />}
            />
          ))}
        </Stack>
      )}
    </StyledBox>
  );
};
