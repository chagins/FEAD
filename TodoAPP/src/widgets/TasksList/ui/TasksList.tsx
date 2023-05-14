import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import { TaskRow, taskModel } from 'entities/task';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { ToggleTask } from 'features/ToggleTask';
import { FilterTasks } from 'features/FilterTasks';
import { StyledTaskList } from './TasksList.styled';

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
    <StyledTaskList>
      <FilterTasks />
      <Stack spacing={4}>
        {tasksStatus === 'pending' && <CircularProgress />}
        {tasksStatus === 'rejected' && <Typography>{tasksError}</Typography>}
        {tasksStatus === 'fulfilled' &&
          tasks.map((task) => (
            <TaskRow
              key={task.id}
              data={task}
              titleHref={`/${task.id}`}
              before={<ToggleTask id={task.id} isCompleted={task.completed} />}
            />
          ))}
      </Stack>
    </StyledTaskList>
  );
};
